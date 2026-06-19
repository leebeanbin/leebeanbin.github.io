// ────────────────────────────────────────────────────────────────────────────
//  프로젝트 목록 — 이 파일만 수정하면 /projects 페이지가 자동으로 업데이트됩니다.
//  태그는 GitHub API (languages + topics) 기준으로 검증됨 (2026-06-19)
// ────────────────────────────────────────────────────────────────────────────

export type Project = {
  name: string;
  url: string;
  desc: string;            // 한 줄 설명
  longDesc?: string;       // 상세 설명 (선택)
  tags: string[];
  featured: boolean;       // true면 상단 Featured 섹션에 표시
  status?: "active" | "archived" | "wip";  // 선택
};

export const projects: Project[] = [
  {
    name: "beanllm",
    url: "https://github.com/leebeanbin/beanllm",
    desc: "멀티 프로바이더 LLM 통합 라이브러리",
    longDesc: "OpenAI · Anthropic · Google · Ollama를 단일 인터페이스로 통합. Client, RAGChain, Agent, Utilities 모듈 구성.",
    // Python 7.4MB, TypeScript 385k | topics: ai, anthropic, fine-tuning, llm, openai, python, rag
    tags: ["Python", "TypeScript", "OpenAI", "Anthropic", "RAG", "LLM"],
    featured: true,
    status: "active",
  },
  {
    name: "umai",
    url: "https://github.com/leebeanbin/umai",
    desc: "채팅 · RAG · 워크플로우 · 파인튜닝 풀스택 AI 플랫폼",
    longDesc: "FastAPI 백엔드 + Next.js 프론트엔드. 대화 기록, 문서 임베딩, Celery 자동화 워크플로우 지원.",
    // TypeScript 911k(1위), Python 544k | topics: celery, fastapi, llm, nextjs, postgresql, python, rag, redis
    tags: ["TypeScript", "Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "RAG"],
    featured: true,
    status: "active",
  },
  {
    name: "mariabean",
    url: "https://github.com/leebeanbin/mariabean",
    desc: "DDD + Hexagonal Architecture 공간예약 플랫폼",
    longDesc: "이벤트 소싱, Kafka 비동기 처리, Elasticsearch 전문 검색, MongoDB 통합. 17개 테스트 클래스.",
    // Java 560k (Kotlin 없음) | topics: ddd, elasticsearch, hexagonal-architecture, java, kafka, mongodb, spring-boot
    tags: ["Java", "Spring Boot", "Kafka", "Elasticsearch", "MongoDB", "DDD"],
    featured: true,
    status: "active",
  },
  {
    name: "beanCli",
    url: "https://github.com/leebeanbin/beanCli",
    desc: "TUI 기반 실시간 스트리밍 데이터 콘솔",
    longDesc: "Kafka 토픽을 터미널에서 바로 시각화. PostgreSQL 연동 스트림 기록.",
    // TypeScript 985k | topics: cli, kafka, postgresql, terminal, tui, typescript
    tags: ["TypeScript", "Kafka", "PostgreSQL", "TUI"],
    featured: false,
    status: "active",
  },
  {
    name: "message-broker-comparison-lab",
    url: "https://github.com/leebeanbin/message-broker-comparison-lab",
    desc: "Redis · RabbitMQ · Kafka 벤치마크 비교 분석",
    longDesc: "Jupyter Notebook 기반. Python · Go로 처리량·지연·신뢰성 시나리오별 측정.",
    // Jupyter 718k, Python 128k, Go 21k | topics: fastapi, jupyter, kafka, python, rabbitmq, redis
    tags: ["Python", "Go", "FastAPI", "Kafka", "Redis", "RabbitMQ", "Jupyter"],
    featured: false,
    status: "active",
  },
  {
    name: "insightstock-ai-service",
    url: "https://github.com/leebeanbin/insightstock-ai-service",
    desc: "주식 데이터 기반 AI 분석 마이크로서비스",
    // Python only | topics: ai, fastapi, llm, microservice, python, stock
    tags: ["Python", "FastAPI", "LLM"],
    featured: false,
    status: "active",
  },
  {
    name: "WhereAmI",
    url: "https://github.com/leebeanbin/WhereAmI",
    desc: "카카오맵 연동 실시간 위치 공유 PWA",
    // TypeScript 322k, Swift 6.9k | topics: kakao-maps, nextjs, pwa, react, typescript
    tags: ["TypeScript", "Next.js", "React", "PWA", "Kakao Maps"],
    featured: false,
    status: "active",
  },
  {
    name: "mariabean-client",
    url: "https://github.com/leebeanbin/mariabean-client",
    desc: "mariabean 예약 플랫폼 Next.js 프론트엔드",
    // TypeScript 532k | topics: nextjs, react, tailwindcss, typescript
    tags: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
    featured: false,
    status: "active",
  },
  {
    name: "dinobot",
    url: "https://github.com/leebeanbin/dinobot",
    desc: "Discord + Notion 연동 밋업 알림 봇",
    // Python 780k (TypeScript 없음) | topics: clean-architecture, discord-bot, fastapi, mongodb, notion, python
    tags: ["Python", "FastAPI", "MongoDB", "Discord", "Notion"],
    featured: false,
    status: "active",
  },
];
