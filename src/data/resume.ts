// ────────────────────────────────────────────────────────────────────────────
//  이력서 데이터 — 여기만 수정하면 /resume 페이지가 자동으로 업데이트됩니다.
//  각 항목에 Ko(한국어) + En(영어) 필드를 모두 채우면 언어 토글 시 자동 번역됩니다.
// ────────────────────────────────────────────────────────────────────────────

export type ResumeData = {
  name: { ko: string; en: string };
  title: { ko: string; en: string };
  photo?: string;
  summary: string;
  summaryEn?: string;
  contact: {
    email: string;
    github: string;
    linkedin?: string;
    blog?: string;
    location?: string;
    phone?: string;
  };
  experience: Array<{
    company: string;
    role: string;
    roleEn?: string;
    period: string;
    location?: string;
    description?: string;
    descriptionEn?: string;
    bullets: string[];
    bulletsEn?: string[];
    tags: string[];
  }>;
  education: Array<{
    school: string;
    major: string;
    majorEn?: string;
    degree: string;
    degreeEn?: string;
    period: string;
    gpa?: string;
    note?: string;
    noteEn?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  projects: Array<{
    name: string;
    url: string;
    summary: string;
    summaryEn?: string;
    tags: string[];
  }>;
  openSource: Array<{
    name: string;           // 프로젝트명
    url: string;            // GitHub URL
    role: string;           // 역할 (예: "Co-author", "Contributor")
    roleEn?: string;
    description: string;
    descriptionEn?: string;
    tags: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  awards: Array<{
    name: string;
    nameEn?: string;
    issuer: string;
    date: string;
    description?: string;
    descriptionEn?: string;
  }>;
};

export const resume: ResumeData = {

  // ── 기본 정보 ─────────────────────────────────────────────────────────────
  name: {
    ko: "이정빈",
    en: "Jake Lee",
  },
  title: {
    ko: "AI / 백엔드 엔지니어",
    en: "AI / Backend Engineer",
  },
  summary: `LLM 통합부터 분산 메시지 시스템까지 — 지능형 백엔드를 설계하고 만듭니다.
Python · Java 기반 프로덕션 경험과 AI 파이프라인 구축 경험을 보유하고 있습니다.`,
  summaryEn: `From LLM integrations to distributed messaging systems — I design and build intelligent backends.
Production experience with Python & Java, and hands-on AI pipeline development.`,

  // ── 증명사진 (선택) ─────────────────────────────────────────────────────
  // photo: "/uploads/profile.jpg",  // public/uploads/ 에 사진 넣고 경로 입력

  // ── 연락처 ────────────────────────────────────────────────────────────────
  contact: {
    email: "wjdqlsdu388@gmail.com",
    github: "https://github.com/leebeanbin",
    linkedin: "",   // "https://linkedin.com/in/..."
    blog: "https://leebeanbin.github.io",
    location: "Seoul, South Korea",
    phone: "",      // "+82-10-xxxx-xxxx"
  },

  // ── 경력 ─────────────────────────────────────────────────────────────────
  experience: [
    {
      company: "Config Intelligence",
      role: "Backend / AI Engineer",
      roleEn: "Backend / AI Engineer",
      period: "2025.XX – 현재",   // TODO: 실제 입사 월로 수정
      location: "Seoul",
      description: "",
      descriptionEn: "",
      bullets: [
        "담당 업무를 입력해주세요",
      ],
      bulletsEn: [
        "Please fill in your responsibilities",
      ],
      tags: ["Python", "FastAPI"],
    },
    {
      company: "계약직 회사명",   // TODO: 실제 회사명으로 수정
      role: "Backend Developer",
      roleEn: "Backend Developer",
      period: "2024.XX – 2025.XX",  // TODO: 실제 기간으로 수정
      location: "Seoul",
      description: "",
      descriptionEn: "",
      bullets: [
        "담당 업무를 입력해주세요",
      ],
      bulletsEn: [
        "Please fill in your responsibilities",
      ],
      tags: ["Python"],
    },
    {
      company: "위커밋",
      role: "백엔드 엔지니어 인턴",
      roleEn: "Backend Engineer Intern",
      period: "2023.XX – 2024.XX",  // TODO: 실제 기간으로 수정
      location: "Seoul",
      description: "",
      descriptionEn: "",
      bullets: [
        "담당 업무를 입력해주세요",
      ],
      bulletsEn: [
        "Please fill in your responsibilities",
      ],
      tags: ["Python", "FastAPI"],
    },
  ],

  // ── 학력 ─────────────────────────────────────────────────────────────────
  education: [
    {
      school: "학교명",
      major: "전공",
      majorEn: "Major",
      degree: "학사",
      degreeEn: "Bachelor's",
      period: "2019.03 – 2025.02",
      gpa: "",
      note: "",
      noteEn: "",
    },
  ],

  // ── 기술 스택 ─────────────────────────────────────────────────────────────
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

  // ── 프로젝트 ──────────────────────────────────────────────────────────────
  projects: [
    {
      name: "beanllm",
      url: "https://github.com/leebeanbin/beanllm",
      summary: "멀티 프로바이더 LLM 통합 라이브러리 (OpenAI / Anthropic / Google / Ollama)",
      summaryEn: "Multi-provider LLM integration library (OpenAI / Anthropic / Google / Ollama)",
      tags: ["Python", "LLM"],
    },
    {
      name: "umai",
      url: "https://github.com/leebeanbin/umai",
      summary: "채팅 · RAG · 워크플로우 · 파인튜닝 풀스택 AI 플랫폼",
      summaryEn: "Full-stack AI platform — chat, RAG, workflow, and fine-tuning",
      tags: ["Python", "FastAPI", "Next.js"],
    },
    {
      name: "mariabean",
      url: "https://github.com/leebeanbin/mariabean",
      summary: "DDD + Hexagonal Architecture 공간예약 플랫폼",
      summaryEn: "Space reservation platform with DDD + Hexagonal Architecture",
      tags: ["Spring Boot", "Kafka", "Elasticsearch"],
    },
  ],

  // ── 오픈소스 기여 ──────────────────────────────────────────────────────────
  openSource: [
    {
      name: "langchain-ai/langchain",
      url: "https://github.com/langchain-ai/langchain",
      role: "Co-author",
      roleEn: "Co-author",
      description: "LangChain 공식 문서 및 튜토리얼 공동 저자. Python LLM 통합 예제 기여.",
      descriptionEn: "Co-authored official LangChain documentation and tutorials. Contributed Python LLM integration examples.",
      tags: ["Python", "LangChain", "LLM"],
    },
  ],

  // ── 자격증 ────────────────────────────────────────────────────────────────
  certifications: [
    // { name: "정보처리기사", issuer: "한국산업인력공단", date: "2024.06" },
  ],

  awards: [
    // { name: "수상명", nameEn: "Award Name", issuer: "주최기관", date: "2023.11", description: "", descriptionEn: "" },
  ],
};

export type Resume = ResumeData;
