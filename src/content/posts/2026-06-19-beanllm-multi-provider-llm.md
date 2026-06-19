---
title: "beanllm — 멀티 프로바이더 LLM 라이브러리를 직접 만든 이유"
description: "OpenAI, Anthropic, Google, Ollama를 하나의 인터페이스로 묶는 Python 라이브러리를 만들면서 겪은 설계 결정들을 정리했습니다."
pubDatetime: 2026-06-19T09:00:00Z
tags: ["Python", "LLM", "OpenAI", "Anthropic", "RAG", "오픈소스"]
featured: true
draft: false
---

어느 날 팀 프로젝트에서 이런 상황이 생겼다. OpenAI GPT-4o로 개발을 완료했는데, 갑자기 "Anthropic Claude로 바꿔서 성능 비교해보자"는 요구가 들어왔다. 코드를 열어보니 `openai.ChatCompletion.create()` 호출이 여기저기 박혀 있었다. 그 순간 느꼈다 — 이건 구조적인 문제다.

그래서 [beanllm](https://github.com/leebeanbin/beanllm)을 만들었다.

## 왜 LangChain이나 LiteLLM을 안 썼냐

LangChain을 안 써본 사람이 거의 없을 텐데, 나도 초기에는 LangChain으로 시작했다. 그러나 몇 가지 불만이 쌓였다.

1. **추상화 레이어가 너무 두껍다.** `LLMChain`, `ConversationChain`, `RetrievalQA` 등 체인 개념을 이해하지 못하면 디버깅이 거의 불가능했다. 오류 메시지가 수십 단계의 래퍼를 거쳐서 올라오기 때문이다.

2. **API가 자주 바뀐다.** LangChain은 0.x 시절부터 1.x로 오면서 인터페이스가 크게 바뀌었고, 내가 짠 코드가 6개월 만에 deprecated 경고로 가득 찼다.

3. **내가 원하는 것만** 필요했다. 멀티 프로바이더 지원, RAG 체인, 간단한 에이전트. 그 이상은 오히려 방해가 됐다.

LiteLLM은 좋은 도구이지만 "프로바이더 라우팅"에 초점이 맞춰져 있고, RAG나 에이전트 패턴은 직접 구현해야 한다. 나는 이것들을 일관된 인터페이스로 묶고 싶었다.

## 핵심 설계 결정: Provider 추상화

라이브러리의 가장 중요한 결정은 `LLMProvider` 추상 클래스 설계였다.

```python
from abc import ABC, abstractmethod
from typing import AsyncIterator

class LLMProvider(ABC):
    @abstractmethod
    async def complete(
        self,
        messages: list[Message],
        *,
        model: str,
        temperature: float = 0.7,
        max_tokens: int | None = None,
        stream: bool = False,
    ) -> CompletionResult | AsyncIterator[str]:
        ...

    @abstractmethod
    async def embed(
        self,
        texts: list[str],
        *,
        model: str,
    ) -> list[list[float]]:
        ...
```

여기서 핵심은 **모든 프로바이더가 동일한 시그니처를 구현한다**는 것이다. `OpenAIProvider`, `AnthropicProvider`, `OllamaProvider`는 각자 내부에서 SDK 호출 방식이 달라도, 외부에서 보면 완전히 동일하게 동작한다.

실제로 OpenAI와 Anthropic의 메시지 포맷이 얼마나 다른지 비교해보면:

```python
# OpenAI SDK
response = await openai_client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "안녕"}],
)

# Anthropic SDK
response = await anthropic_client.messages.create(
    model="claude-opus-4-8",
    max_tokens=1024,
    messages=[{"role": "user", "content": "안녕"}],
)
```

겉보기엔 비슷하지만 Anthropic은 `max_tokens`가 필수이고, system prompt 처리 방식도 다르다. 이런 차이들을 각 Provider 어댑터가 숨겨준다.

## 프로바이더 전환 — 실제로 어떻게 되는가

beanllm을 쓰면 이렇게 된다:

```python
from beanllm import Client, OpenAIProvider, AnthropicProvider

# 개발 중엔 OpenAI
client = Client(provider=OpenAIProvider(api_key="sk-..."))

# 비교 실험 시 Anthropic으로 전환 — 한 줄 변경
client = Client(provider=AnthropicProvider(api_key="sk-ant-..."))

# 코드 나머지는 완전히 동일
response = await client.complete(
    messages=[{"role": "user", "content": "FastAPI와 Django의 차이를 설명해줘"}],
    model="gpt-4o",  # 또는 "claude-opus-4-8"
)
print(response.content)
```

프로바이더를 바꿔도 호출부 코드는 한 줄도 바뀌지 않는다.

## RAGChain 모듈

단순 completion을 넘어, 내가 가장 많이 쓰는 패턴은 RAG다. `RAGChain`은 세 단계를 하나로 묶는다:

```
[질문] → [벡터 검색] → [컨텍스트 주입] → [LLM 답변]
```

```python
from beanllm import RAGChain, OpenAIProvider
from beanllm.retrievers import PgVectorRetriever

chain = RAGChain(
    provider=OpenAIProvider(api_key="..."),
    retriever=PgVectorRetriever(dsn="postgresql://..."),
    embed_model="text-embedding-3-small",
    chat_model="gpt-4o-mini",
    top_k=5,
)

answer = await chain.query("우리 서비스 환불 정책은?")
print(answer.content)
print(answer.sources)  # 어떤 문서에서 왔는지 추적 가능
```

내부적으로는 다음 순서로 동작한다:

1. 질문을 임베딩 벡터로 변환 (`embed_model`)
2. `PgVectorRetriever`가 PostgreSQL의 pgvector 확장을 통해 코사인 유사도로 top-k 문서 조회
3. 조회된 문서를 시스템 프롬프트에 주입
4. `chat_model`이 컨텍스트를 활용해 답변 생성
5. 사용된 소스 문서 메타데이터 반환

## 스트리밍 지원

스트리밍은 UX 관점에서 필수적이었다. 특히 긴 답변을 생성할 때 첫 토큰까지의 지연이 체감으로 크게 느껴지기 때문이다.

```python
async for chunk in client.complete(
    messages=[{"role": "user", "content": "Python 비동기 프로그래밍에 대해 설명해줘"}],
    model="gpt-4o",
    stream=True,
):
    print(chunk, end="", flush=True)
```

Provider별로 스트리밍 구현 방식이 다 다르다. OpenAI는 SSE, Anthropic은 자체 스트리밍 이벤트, Ollama는 chunked JSON이다. 이 차이를 각 어댑터 내부에서 AsyncIterator로 추상화해서 호출자는 신경 쓸 필요가 없다.

## 만들면서 어려웠던 점

**타입 시스템.** `stream=True`이면 `AsyncIterator[str]`, `stream=False`이면 `CompletionResult`를 반환해야 하는데, Python의 `overload` 데코레이터로는 이 오버로딩을 완전히 표현하기가 까다롭다. 결국 런타임 체크와 타입 주석을 조합하는 방식으로 타협했다.

**Ollama 로컬 모델의 불안정성.** Ollama는 로컬에서 실행하는 특성상 네트워크 타임아웃이나 응답 형식이 모델마다 조금씩 달랐다. 방어 코드를 꽤 많이 써야 했다.

**테스트 비용.** OpenAI, Anthropic API를 실제로 호출하는 통합 테스트는 비용이 발생한다. 초기엔 `unittest.mock`으로 전부 모킹했는데, 이 경우 실제 API 변경을 잡지 못하는 문제가 있었다. 결국 주요 엔드포인트에 대한 실제 API 호출 테스트를 CI에서 `--integration` 플래그로 선택적으로 실행하는 구조로 정착했다.

## 현재 상태와 앞으로

현재 beanllm은 다음을 지원한다:

- **Provider**: OpenAI, Anthropic, Google Gemini, Ollama
- **모듈**: Client, RAGChain, Agent (ReAct 패턴), Utilities
- **Retriever**: PgVector, 인메모리 (테스트용)
- **임베딩**: OpenAI Embeddings, Sentence Transformers

앞으로 추가하고 싶은 것들은 Cohere, Mistral 프로바이더, 그리고 LLM 응답 캐싱 레이어다. 같은 질문에 같은 컨텍스트면 굳이 API를 다시 호출할 이유가 없으니까.

직접 쓰면서 만들었기 때문에 애착이 있는 프로젝트다. 만약 멀티 프로바이더 LLM 통합이 필요한 Python 프로젝트를 하고 있다면 한번 살펴봐 주시길.
