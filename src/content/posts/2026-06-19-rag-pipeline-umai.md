---
title: "RAG 파이프라인 직접 구현하기 — umai에서 배운 것들"
description: "문서 임베딩부터 검색, 답변 생성까지. FastAPI + pgvector로 프로덕션 RAG 파이프라인을 구축하면서 겪은 현실적인 문제들과 해결책."
pubDatetime: 2026-06-19T10:00:00Z
tags: ["Python", "FastAPI", "RAG", "PostgreSQL", "LLM", "AI"]
featured: true
draft: false
---

RAG(Retrieval-Augmented Generation)는 이제 AI 백엔드에서 거의 필수 요소가 됐다. LLM이 학습 데이터에 없는 정보를 다뤄야 할 때, 환각(hallucination)을 줄이고 싶을 때, 사내 문서 기반의 Q&A 시스템을 만들 때 — RAG가 답이다.

[umai](https://github.com/leebeanbin/umai) 프로젝트에서 RAG 파이프라인을 직접 구현하면서 블로그 하나를 채울 만큼 배운 게 많았다. 이 글은 그 기록이다.

## RAG란 무엇인가

순수한 LLM은 학습 시점까지의 지식만 갖고 있다. 최신 뉴스, 사내 문서, 개인 데이터 같은 것들은 당연히 모른다. RAG는 이 문제를 이렇게 해결한다:

```
[사용자 질문]
    ↓
[질문을 벡터로 변환 (임베딩)]
    ↓
[벡터 DB에서 유사한 문서 검색]
    ↓
[검색된 문서 + 질문을 LLM에 전달]
    ↓
[LLM이 문서를 참고해서 답변 생성]
```

핵심은 LLM을 재학습하지 않고, **검색**으로 컨텍스트를 동적으로 주입하는 것이다.

## 전체 아키텍처

umai의 RAG 파이프라인은 크게 두 경로로 나뉜다.

**인덱싱 경로** (오프라인):
```
문서 업로드 → 청킹 → 임베딩 → pgvector 저장
```

**쿼리 경로** (실시간):
```
질문 → 임베딩 → 벡터 검색 → LLM 호출 → 답변 반환
```

기술 스택은 다음과 같다:
- **FastAPI** — 비동기 API 서버
- **PostgreSQL + pgvector** — 벡터 저장소 (별도 벡터 DB 없이 PostgreSQL 확장으로 해결)
- **OpenAI `text-embedding-3-small`** — 임베딩 모델
- **Celery + Redis** — 문서 인덱싱 비동기 처리

## 1단계: 문서 청킹

문서를 그대로 통째로 임베딩하면 안 된다. 너무 길면 임베딩 모델의 컨텍스트 윈도우를 벗어나고, 검색 정확도도 떨어진다. 적절한 크기로 잘라야 한다.

처음엔 단순하게 고정 길이로 잘랐다:

```python
def chunk_fixed(text: str, size: int = 500, overlap: int = 50) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        chunks.append(text[start : start + size])
        start += size - overlap
    return chunks
```

이 방법의 문제: 문장이 중간에 잘린다. `"FastAPI는 Python 기반의 비동기 웹 프레임워크"` 같은 문장이 `"FastAPI는 Python 기반의 비동"`과 `"기 웹 프레임워크"`로 나뉘면 두 청크 모두 의미가 흐려진다.

개선한 방법은 **문장 단위 청킹**이다:

```python
import re

def chunk_by_sentence(
    text: str,
    max_chars: int = 800,
    overlap_sentences: int = 1,
) -> list[str]:
    # 마침표, 느낌표, 물음표, 개행 기준으로 분리
    sentences = re.split(r"(?<=[.!?\n])\s+", text.strip())
    
    chunks, current, current_len = [], [], 0
    for sent in sentences:
        if current_len + len(sent) > max_chars and current:
            chunks.append(" ".join(current))
            # overlap: 마지막 N개 문장을 다음 청크에 포함
            current = current[-overlap_sentences:]
            current_len = sum(len(s) for s in current)
        current.append(sent)
        current_len += len(sent)
    
    if current:
        chunks.append(" ".join(current))
    
    return chunks
```

이렇게 하면 문장 경계를 지키면서도 overlap으로 연결 문맥이 유지된다.

## 2단계: 임베딩과 pgvector 저장

임베딩은 텍스트를 고차원 벡터 공간의 한 점으로 변환하는 것이다. 의미가 비슷한 텍스트는 벡터 공간에서 가까이 위치하고, 이를 코사인 유사도로 검색할 수 있다.

umai는 OpenAI의 `text-embedding-3-small`을 사용한다. 1536차원, 비용이 낮고 성능이 준수하다.

```python
async def embed_chunks(chunks: list[str]) -> list[list[float]]:
    response = await openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=chunks,
    )
    return [item.embedding for item in response.data]
```

벡터는 PostgreSQL의 pgvector 확장에 저장한다. 별도의 벡터 DB(Pinecone, Weaviate 등)를 추가하지 않고 기존 PostgreSQL에 확장 하나로 해결하는 것이 umai 아키텍처의 핵심 선택이었다.

```sql
-- pgvector 설치 후
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    embedding   VECTOR(1536),
    metadata    JSONB DEFAULT '{}'
);

-- 검색 성능을 위한 IVFFlat 인덱스
CREATE INDEX ON document_chunks
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

Python에서 저장:

```python
async def store_chunks(
    document_id: UUID,
    chunks: list[str],
    embeddings: list[list[float]],
    session: AsyncSession,
) -> None:
    rows = [
        DocumentChunk(
            document_id=document_id,
            content=chunk,
            embedding=embedding,
        )
        for chunk, embedding in zip(chunks, embeddings)
    ]
    session.add_all(rows)
    await session.commit()
```

## 3단계: 쿼리 시 벡터 검색

사용자가 질문하면, 그 질문도 똑같이 임베딩하고 저장된 청크들과 코사인 유사도를 비교한다.

```python
async def retrieve(
    query: str,
    top_k: int = 5,
    session: AsyncSession,
) -> list[DocumentChunk]:
    query_embedding = await embed_chunks([query])
    
    result = await session.execute(
        select(DocumentChunk)
        .order_by(
            DocumentChunk.embedding.cosine_distance(query_embedding[0])
        )
        .limit(top_k)
    )
    return result.scalars().all()
```

`cosine_distance`는 pgvector가 제공하는 연산자다. 값이 작을수록 유사도가 높다(거리가 가깝다).

## 4단계: LLM에 컨텍스트 주입

검색된 청크들을 시스템 프롬프트에 넣고 LLM에 전달한다.

```python
async def answer(query: str, session: AsyncSession) -> str:
    chunks = await retrieve(query, top_k=5, session=session)
    
    context = "\n\n---\n\n".join(c.content for c in chunks)
    
    system_prompt = f"""당신은 주어진 문서를 기반으로 정확하게 답변하는 AI입니다.
아래 컨텍스트만을 참고해서 답변하세요.
컨텍스트에 없는 내용은 "문서에서 찾을 수 없습니다"라고 답변하세요.

컨텍스트:
{context}"""

    response = await openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query},
        ],
    )
    return response.choices[0].message.content
```

`"컨텍스트에 없는 내용은 '문서에서 찾을 수 없습니다'라고 답변하세요"` — 이 한 문장이 환각을 줄이는 데 생각보다 효과가 크다.

## 현실에서 부딪힌 문제들

### 문제 1: 검색은 됐는데 답변이 엉뚱하다

처음엔 top-k 검색만 했는데, 코사인 유사도가 높다고 항상 질문과 관련 있는 게 아니었다. 특히 짧은 질문일수록 엉뚱한 청크가 올라오는 경우가 많았다.

해결책: **유사도 임계값(threshold)** 설정. 일정 유사도 이하 청크는 버린다.

```python
MIN_SIMILARITY = 0.75  # 코사인 유사도 기준 (1 - cosine_distance)

chunks = [
    c for c in raw_chunks
    if (1 - c.cosine_distance) >= MIN_SIMILARITY
]
```

### 문제 2: 큰 PDF 문서 인덱싱이 API 타임아웃을 냈다

100페이지 PDF를 업로드하면 수백 개의 청크가 생기고, 각각 임베딩 API 호출이 필요하다. 동기적으로 처리하면 응답이 30초 이상 걸렸다.

해결책: **Celery 비동기 작업**으로 분리.

```python
@celery_app.task
def index_document_task(document_id: str) -> None:
    # 긴 작업은 백그라운드에서
    asyncio.run(_index_document(UUID(document_id)))

# API 엔드포인트는 즉시 반환
@router.post("/documents")
async def upload_document(file: UploadFile) -> dict:
    document = await save_document(file)
    index_document_task.delay(str(document.id))  # 비동기 시작
    return {"id": str(document.id), "status": "indexing"}
```

클라이언트는 문서 상태를 별도 엔드포인트로 폴링하거나, WebSocket으로 진행률을 받는다.

### 문제 3: 임베딩 비용

`text-embedding-3-small`은 저렴하지만 대량 문서를 처리하면 비용이 누적된다. 게다가 같은 청크를 여러 번 임베딩하는 낭비도 있었다.

해결책: **청크 해시 기반 캐싱**. 내용이 같은 청크는 임베딩을 재사용한다.

```python
import hashlib

async def embed_with_cache(
    chunks: list[str],
    redis: Redis,
) -> list[list[float]]:
    results = []
    to_embed = []
    indices = []
    
    for i, chunk in enumerate(chunks):
        key = f"embed:{hashlib.sha256(chunk.encode()).hexdigest()}"
        cached = await redis.get(key)
        if cached:
            results.append((i, json.loads(cached)))
        else:
            to_embed.append(chunk)
            indices.append(i)
    
    if to_embed:
        new_embeddings = await embed_chunks(to_embed)
        for idx, embedding in zip(indices, new_embeddings):
            key = f"embed:{hashlib.sha256(chunks[idx].encode()).hexdigest()}"
            await redis.setex(key, 86400 * 7, json.dumps(embedding))  # 7일 캐시
            results.append((idx, embedding))
    
    return [emb for _, emb in sorted(results)]
```

## 결과와 교훈

umai에서 이 파이프라인을 실제로 써보니 몇 가지가 명확해졌다.

**청킹 전략이 검색 품질을 결정한다.** 임베딩 모델이나 LLM보다 청킹을 잘 하는 게 더 중요할 때가 많다. 특히 표, 코드 블록이 섞인 기술 문서는 별도 처리 로직이 필요하다.

**pgvector는 중소 규모에 충분히 강력하다.** 수십만 개 청크 이하라면 Pinecone이나 Weaviate 없이 PostgreSQL로 충분하다. 인프라를 단순하게 유지할 수 있다.

**LLM에 "모르면 모른다고 해"를 명시적으로 가르쳐야 한다.** 시스템 프롬프트에 이 지시를 넣는 것만으로 환각이 눈에 띄게 줄었다.

**비동기 인덱싱은 선택이 아니다.** 사용자가 업로드 버튼을 눌렀을 때 30초를 기다리게 하면 안 된다. Celery 같은 비동기 작업 큐는 처음부터 설계에 포함시켜야 한다.

RAG는 구현 자체보다 **데이터 품질**과 **청킹 전략**에 훨씬 많은 시간을 써야 하는 영역이다. 화려한 기술보다 기본기가 결과를 결정한다.
