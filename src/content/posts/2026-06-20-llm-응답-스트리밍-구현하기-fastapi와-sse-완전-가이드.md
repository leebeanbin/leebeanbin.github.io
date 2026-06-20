---
title: "LLM 응답 스트리밍 구현하기 — FastAPI와 SSE 완전 가이드"
description: "ChatGPT처럼 글자가 흘러나오는 스트리밍 응답을 FastAPI + Server-Sent Events로 직접 구현하는 방법. OpenAI SDK의 스트리밍 API부터 프로덕션 고려사항까지."
pubDatetime: 2026-06-20T08:00:00.000Z
tags: ["Python", "FastAPI", "LLM", "OpenAI"]
featured: true
draft: false
---

> [!WARNING]
> 이 포스트는 현재 블로그 기능(슬라이드 모드 · callout · 코드 하이라이트) 테스트 목적으로 작성 중입니다. 내용은 실제 구현 기준으로 정확하지만, 추가 보완 예정입니다.

ChatGPT를 처음 썼을 때 가장 인상적이었던 건 **글자가 하나씩 흘러나오는 느낌**이었다. 단순한 UX 트릭처럼 보이지만, 실제로는 LLM의 생성 방식과 완벽하게 맞아떨어지는 설계다.

이 글에서는 FastAPI로 LLM 스트리밍 응답을 구현하는 방법을 처음부터 끝까지 다룬다.

---

## 왜 스트리밍인가

LLM은 토큰을 **순차적으로** 생성한다. 전체 응답이 완성될 때까지 기다렸다가 한 번에 전송하면, 사용자는 5~30초 동안 빈 화면을 본다.

| 방식 | 첫 응답까지 | 체감 속도 | 구현 복잡도 |
|------|------------|---------|------------|
| 일반 요청 | 5~30초 | 느림 | 낮음 |
| 스트리밍 | < 1초 | 빠름 | 보통 |

> [!NOTE]
> 스트리밍은 실제 처리 속도를 높이는 게 아니라, **첫 토큰이 오는 순간부터 사용자에게 보여주는** 방식이다. 총 소요 시간은 동일하다.

---

## 핵심 개념: SSE

**Server-Sent Events(SSE)** 는 서버 → 클라이언트 단방향 실시간 통신 프로토콜이다. WebSocket보다 단순하고, HTTP 위에서 동작하기 때문에 기존 인프라와 잘 맞는다.

SSE 응답 형식은 이렇게 생겼다:

```
data: {"token": "안"}

data: {"token": "녕"}

data: {"token": "하"}

data: [DONE]
```

각 청크는 `data: ` 접두사와 이중 개행(`\n\n`)으로 구분된다.

> [!TIP]
> SSE는 HTTP/1.1과 HTTP/2 모두 지원되고, 자동 재연결 기능이 브라우저에 내장되어 있다. Nginx를 쓴다면 `proxy_buffering off` 설정을 잊지 말 것.

---

## 구현: FastAPI 스트리밍 엔드포인트

### 1. 기본 스트리밍 제너레이터

```python title="app/streaming.py"
from openai import AsyncOpenAI
from typing import AsyncGenerator

client = AsyncOpenAI()

async def stream_llm(prompt: str) -> AsyncGenerator[str, None]:
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        stream=True,  # [!code highlight]
    )

    async for chunk in response:
        delta = chunk.choices[0].delta
        if delta.content:
            yield delta.content
```

### 2. FastAPI SSE 엔드포인트

```python title="app/main.py"
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import json

app = FastAPI()

@app.post("/chat/stream")
async def chat_stream(body: ChatRequest):
    async def event_generator():
        async for token in stream_llm(body.message):
            data = json.dumps({"token": token}, ensure_ascii=False)
            yield f"data: {data}\n\n"
        yield "data: [DONE]\n\n"  # [!code highlight]

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",  # [!code highlight]
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
```

> [!WARNING]
> `media_type="text/event-stream"` 을 빠뜨리면 브라우저가 스트리밍으로 처리하지 않는다. 또한 Nginx/CDN 단에서 응답 버퍼링이 켜져 있으면 청크가 모인 뒤 한꺼번에 전송된다.

---

## 프론트엔드: EventSource vs Fetch

브라우저에서 SSE를 받는 방법은 두 가지다.

### EventSource (GET만 가능)

```javascript title="client.js"
const source = new EventSource("/chat/stream?message=안녕");

source.onmessage = (e) => {
  if (e.data === "[DONE]") { source.close(); return; }
  const { token } = JSON.parse(e.data);
  appendToken(token);
};
```

### Fetch + ReadableStream (POST 가능, 권장)

```javascript title="client.js"
const res = await fetch("/chat/stream", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "안녕" }),
});

const reader = res.body.getReader();  // [!code highlight]
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const lines = decoder.decode(value).split("\n\n");
  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;
    const data = line.slice(6);
    if (data === "[DONE]") return;
    const { token } = JSON.parse(data);
    appendToken(token);
  }
}
```

> [!NOTE]
> `EventSource` 는 `GET` 요청만 지원한다. 긴 프롬프트나 Authorization 헤더가 필요한 경우 `Fetch` 방식을 써야 한다.

---

## 에러 처리: 프로덕션 필수 패턴

스트리밍 중간에 예외가 발생하면 클라이언트는 그냥 연결이 끊긴 것처럼 보인다. 에러 토큰을 명시적으로 보내야 한다.

```python title="app/streaming.py"
async def stream_llm_safe(prompt: str) -> AsyncGenerator[str, None]:
    try:
        async for token in stream_llm(prompt):
            yield token
    except openai.RateLimitError:
        yield "\n\n⚠️ 요청 한도 초과. 잠시 후 다시 시도해주세요."  # [!code ++]
    except openai.APITimeoutError:
        yield "\n\n⚠️ 응답 시간 초과."  # [!code ++]
    except Exception as e:
        logger.error(f"Streaming error: {e}")
        yield "\n\n⚠️ 서버 오류가 발생했습니다."  # [!code ++]
```

---

## 프로덕션 체크리스트

| 항목 | 구현 방법 |
|------|---------|
| 타임아웃 | `httpx.Timeout(connect=5, read=30)` |
| 재시도 | `tenacity` 라이브러리, 지수 백오프 |
| 취소 | 클라이언트 disconnect 감지 후 generator 종료 |
| 로깅 | 스트림 완료 후 총 토큰 수 기록 |
| 비용 추적 | `usage` 필드 (스트리밍 종료 후 마지막 청크에 포함) |
| Nginx 설정 | `proxy_buffering off; proxy_read_timeout 300s;` |

---

## 마무리

스트리밍 구현의 핵심을 정리하면:

1. OpenAI SDK에서 `stream=True` 로 AsyncGenerator 생성
2. FastAPI `StreamingResponse` + `text/event-stream` 으로 SSE 전송
3. 프론트엔드에서 `fetch` + `ReadableStream` 으로 수신
4. Nginx `proxy_buffering off` 설정 필수

다음 글에서는 **멀티 에이전트 환경에서의 스트리밍** — 여러 LLM 호출 결과를 하나의 스트림으로 합치는 패턴을 다룰 예정이다.

---

## 참고

- [OpenAI Streaming Guide](https://platform.openai.com/docs/api-reference/streaming)
- [FastAPI StreamingResponse](https://fastapi.tiangolo.com/advanced/custom-response/#streamingresponse)
- [MDN: Server-Sent Events](https://developer.mozilla.org/ko/docs/Web/API/Server-sent_events/Using_server-sent_events)
