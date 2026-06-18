// ────────────────────────────────────────────────────────────────────────────
//  사이트 전체 콘텐츠 설정 — 이 파일만 수정하면 홈·소개 페이지가 업데이트됩니다.
//
//  수정 포인트:
//   hero        → 메인 페이지 이름·역할·소개 문구
//   techStack   → 메인 페이지 기술 스택 칩 목록
//   about.ko/en → 소개 페이지 문단 (한국어 / 영어 각각)
//   skillGroups → 소개 페이지 기술 스택 그리드
// ────────────────────────────────────────────────────────────────────────────

export const siteContent = {

  // ── 히어로 (메인 페이지 상단) ────────────────────────────────────────────
  hero: {
    greeting:  "안녕하세요",
    greetingEn: "Hello, I'm",
    name:      "이정빈",
    nameEn:    "Jake Lee",
    role:      "AI / Backend Engineer",
    bio:       "LLM 통합부터 분산 메시지 시스템까지 — 지능형 백엔드를 설계하고 만듭니다. 실전 경험과 코드를 이 공간에 기록합니다.",
    bioEn:     "From LLM integrations to distributed messaging systems — I design and build intelligent backends. I document my real-world experience and code here.",
  },

  // ── 기술 스택 칩 (메인 페이지) ───────────────────────────────────────────
  techStack: [
    "Python", "Java", "TypeScript",
    "Spring Boot", "FastAPI",
    "LangChain", "OpenAI", "Kafka",
    "PostgreSQL", "Docker",
  ],

  // ── About 페이지 콘텐츠 ──────────────────────────────────────────────────
  about: {
    // 한국어 소개 단락 (배열 요소 하나 = 단락 하나)
    ko: [
      "AI/Backend Engineer로 LLM 통합 라이브러리부터 DDD 기반 예약 플랫폼까지 다양한 시스템을 설계하고 구현해왔습니다.",
      "Python과 Java를 주력으로 사용하며, OpenAI · Anthropic · Ollama를 단일 인터페이스로 묶는 beanllm, 풀스택 AI 플랫폼 umai 등 직접 만든 오픈소스 프로젝트를 운영 중입니다.",
      "이 블로그는 아키텍처 설계 고민, 실전에서 겪은 문제와 해결책, 그리고 새 프로젝트의 시작 기록을 남기는 공간입니다.",
    ],
    // 영어 소개 단락
    en: [
      "I'm an AI/Backend Engineer who has designed and built a wide range of systems — from LLM integration libraries to DDD-based reservation platforms.",
      "My primary languages are Python and Java. I maintain open-source projects including beanllm (a multi-provider LLM toolkit) and umai (a full-stack AI platform).",
      "This blog is where I record architectural decisions, problems I've encountered in production, and the story behind each new project.",
    ],
    // 기술 스택 그룹 (소개 페이지용)
    skillGroups: [
      { label: "Language",  items: ["Python", "Java", "TypeScript", "Kotlin"] },
      { label: "Backend",   items: ["Spring Boot", "FastAPI", "Node.js"] },
      { label: "AI / ML",   items: ["OpenAI API", "Anthropic", "LangChain", "Ollama", "RAG"] },
      { label: "Infra",     items: ["Kafka", "Redis", "Elasticsearch", "PostgreSQL", "MongoDB", "Docker"] },
      { label: "Frontend",  items: ["Next.js", "React", "Tailwind CSS"] },
    ],
  },

} as const;
