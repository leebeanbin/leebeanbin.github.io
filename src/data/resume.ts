// ────────────────────────────────────────────────────────────────────────────
//  이력서 데이터 — 여기만 수정하면 /resume 페이지가 자동으로 업데이트됩니다.
//  각 항목에 Ko(한국어) + En(영어) 필드를 모두 채우면 언어 토글 시 자동 번역됩니다.
// ────────────────────────────────────────────────────────────────────────────

export type ResumeData = {
  name: { ko: string; en: string };
  title: { ko: string; en: string };
  photo?: string;           // 증명사진 URL 또는 /uploads/photo.jpg
  summary: string;
  summaryEn?: string;
  contact: {
    email: string;
    github: string;
    linkedin?: string;
    blog?: string;
    location?: string;      // 예: "Seoul, South Korea"
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
      company: "회사명을 입력하세요",
      role: "직책 / 역할",
      roleEn: "Role Title",
      period: "2025.01 – 현재",
      location: "서울",
      description: "팀/프로젝트 한 줄 설명",
      descriptionEn: "One-line team or project description",
      bullets: [
        "주요 업무 또는 성과를 입력하세요",
        "수치가 있으면 넣으면 좋습니다 — 예: API 응답속도 40% 개선",
        "사용한 기술 스택도 언급하면 좋아요",
      ],
      bulletsEn: [
        "Describe your key responsibilities or achievements",
        "Include metrics when possible — e.g., Reduced API latency by 40%",
        "Mention the tech stack you used",
      ],
      tags: ["Python", "FastAPI", "PostgreSQL"],
    },
    // 경력이 더 있으면 아래에 복사해서 추가
    // {
    //   company: "",
    //   role: "",
    //   roleEn: "",
    //   period: "",
    //   description: "",
    //   descriptionEn: "",
    //   bullets: [],
    //   bulletsEn: [],
    //   tags: [],
    // },
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

  // ── 자격증 ────────────────────────────────────────────────────────────────
  certifications: [
    // { name: "정보처리기사", issuer: "한국산업인력공단", date: "2024.06" },
  ],

  awards: [
    // { name: "수상명", nameEn: "Award Name", issuer: "주최기관", date: "2023.11", description: "", descriptionEn: "" },
  ],
};

export type Resume = ResumeData;
