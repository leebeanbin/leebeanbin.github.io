// ────────────────────────────────────────────────────────────────────────────
//  프로젝트 목록 — 이 파일만 수정하면 /projects 페이지가 자동으로 업데이트됩니다.
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
    tags: ["Python", "LLM", "OpenAI", "Anthropic", "Ollama"],
    featured: true,
    status: "active",
  },
  {
    name: "umai",
    url: "https://github.com/leebeanbin/umai",
    desc: "채팅 · RAG · 워크플로우 · 파인튜닝 풀스택 AI 플랫폼",
    longDesc: "FastAPI 백엔드 + Next.js 프론트엔드. 대화 기록, 문서 임베딩, 자동화 워크플로우 지원.",
    tags: ["Python", "FastAPI", "Next.js", "RAG", "LangChain"],
    featured: true,
    status: "active",
  },
  {
    name: "mariabean",
    url: "https://github.com/leebeanbin/mariabean",
    desc: "DDD + Hexagonal Architecture 공간예약 플랫폼",
    longDesc: "이벤트 소싱, Kafka 비동기 처리, Elasticsearch 전문 검색 통합. 17개 테스트 클래스.",
    tags: ["Spring Boot", "Kotlin", "Kafka", "Elasticsearch", "DDD"],
    featured: true,
    status: "active",
  },
  {
    name: "beanCli",
    url: "https://github.com/leebeanbin/beanCli",
    desc: "TUI 기반 실시간 스트리밍 데이터 콘솔",
    longDesc: "Kafka 토픽을 터미널에서 바로 시각화. PostgreSQL 연동 스트림 기록.",
    tags: ["TypeScript", "Kafka", "PostgreSQL", "TUI"],
    featured: false,
    status: "active",
  },
  {
    name: "message-broker-comparison-lab",
    url: "https://github.com/leebeanbin/message-broker-comparison-lab",
    desc: "Redis · RabbitMQ · Kafka 벤치마크 비교 분석",
    longDesc: "Jupyter Notebook 18개. 처리량·지연·신뢰성 시나리오별 측정.",
    tags: ["Python", "FastAPI", "Jupyter", "Kafka", "Redis", "RabbitMQ"],
    featured: false,
    status: "active",
  },
  {
    name: "insightstock-ai-service",
    url: "https://github.com/leebeanbin/insightstock-ai-service",
    desc: "주식 데이터 기반 AI 분석 서비스",
    tags: ["Python", "FastAPI", "LLM", "Finance"],
    featured: false,
    status: "active",
  },
  {
    name: "WhereAmI",
    url: "https://github.com/leebeanbin/WhereAmI",
    desc: "실시간 위치 공유 PWA",
    tags: ["TypeScript", "React", "PWA", "WebSocket"],
    featured: false,
    status: "active",
  },
  {
    name: "mariabean-client",
    url: "https://github.com/leebeanbin/mariabean-client",
    desc: "mariabean 예약 플랫폼 Next.js 프론트엔드",
    tags: ["Next.js", "React", "TypeScript"],
    featured: false,
    status: "active",
  },
  {
    name: "dinobot",
    url: "https://github.com/leebeanbin/dinobot",
    desc: "Discord 밋업 알림 봇",
    tags: ["TypeScript", "Discord.js", "Node.js"],
    featured: false,
    status: "active",
  },
];
