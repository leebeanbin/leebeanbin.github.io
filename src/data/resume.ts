// ────────────────────────────────────────────────────────────────────────────
//  이력서 데이터 — 여기만 수정하면 /resume 페이지가 자동으로 업데이트됩니다.
// ────────────────────────────────────────────────────────────────────────────

export const resume = {

  // ── 기본 정보 ─────────────────────────────────────────────────────────────
  name: {
    ko: "이정빈",       // 한국어 이름
    en: "Jake Lee",     // 영어 이름
  },
  title: {
    ko: "AI / 백엔드 엔지니어",
    en: "AI / Backend Engineer",
  },
  // 한 두 줄 자기소개
  summary: `LLM 통합부터 분산 메시지 시스템까지 — 지능형 백엔드를 설계하고 만듭니다.
Python · Java 기반 프로덕션 경험과 AI 파이프라인 구축 경험을 보유하고 있습니다.`,

  // ── 연락처 ────────────────────────────────────────────────────────────────
  contact: {
    email: "wjdqlsdu388@gmail.com",
    github: "https://github.com/leebeanbin",
    linkedin: "",       // 있으면 채워주세요: "https://linkedin.com/in/..."
    blog: "https://leebeanbin.github.io",
  },

  // ── 경력 ─────────────────────────────────────────────────────────────────
  // 최신 순으로 입력하세요
  experience: [
    {
      company: "회사명을 입력하세요",
      role: "직책 / 역할",
      period: "2025.01 – 현재",       // 예: "2023.03 – 2024.12"
      location: "서울",               // 선택사항
      description: "팀/프로젝트 한 줄 설명",
      bullets: [
        "주요 업무 또는 성과를 입력하세요",
        "수치가 있으면 넣으면 좋습니다 — 예: API 응답속도 40% 개선",
        "사용한 기술 스택도 언급하면 좋아요",
      ],
      tags: ["Python", "FastAPI", "PostgreSQL"],   // 사용 기술
    },
    // 경력이 더 있으면 아래에 복사해서 추가하세요
    // {
    //   company: "",
    //   role: "",
    //   period: "",
    //   description: "",
    //   bullets: [],
    //   tags: [],
    // },
  ],

  // ── 학력 ─────────────────────────────────────────────────────────────────
  education: [
    {
      school: "학교명",
      major: "전공",
      degree: "학사",                 // 학사 / 석사 / 박사
      period: "2019.03 – 2025.02",
      gpa: "",                        // 선택 — 예: "3.8 / 4.5"
      note: "",                       // 선택 — 예: "수석 졸업", "우수상"
    },
  ],

  // ── 기술 스택 ─────────────────────────────────────────────────────────────
  // category 이름 자유롭게 변경 가능
  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "TypeScript", "Kotlin"],
    },
    {
      category: "Backend",
      items: ["Spring Boot", "FastAPI", "Node.js"],
    },
    {
      category: "AI / ML",
      items: ["OpenAI API", "Anthropic Claude", "LangChain", "Ollama", "RAG"],
    },
    {
      category: "Database & Infra",
      items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Apache Kafka", "Docker"],
    },
    {
      category: "Frontend",
      items: ["Next.js", "React", "Tailwind CSS"],
    },
  ],

  // ── 프로젝트 (이력서용 하이라이트) ──────────────────────────────────────
  projects: [
    {
      name: "beanllm",
      url: "https://github.com/leebeanbin/beanllm",
      summary: "멀티 프로바이더 LLM 통합 라이브러리 (OpenAI / Anthropic / Google / Ollama)",
      tags: ["Python", "LLM"],
    },
    {
      name: "umai",
      url: "https://github.com/leebeanbin/umai",
      summary: "채팅 · RAG · 워크플로우 · 파인튜닝 풀스택 AI 플랫폼",
      tags: ["Python", "FastAPI", "Next.js"],
    },
    {
      name: "mariabean",
      url: "https://github.com/leebeanbin/mariabean",
      summary: "DDD + Hexagonal Architecture 공간예약 플랫폼",
      tags: ["Spring Boot", "Kafka", "Elasticsearch"],
    },
  ],

  // ── 자격증 / 수상 ─────────────────────────────────────────────────────────
  // 없으면 빈 배열로 두세요
  certifications: [
    // { name: "정보처리기사", issuer: "한국산업인력공단", date: "2024.06" },
  ],

  awards: [
    // { name: "수상명", issuer: "주최기관", date: "2023.11", description: "" },
  ],

} as const;

export type Resume = typeof resume;
