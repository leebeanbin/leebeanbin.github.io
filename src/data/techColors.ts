// 기술 브랜드 컬러 맵 — resume, about, projects 페이지의 칩에 사용됩니다.
// 없는 기술은 기본 accent 색상으로 표시됩니다.
export const TECH_COLORS: Record<string, string> = {
  // ── Languages ──────────────────────────────────────────────────────────────
  Python:       "#3776AB",
  Java:         "#ED8B00",
  TypeScript:   "#3178C6",
  JavaScript:   "#F7DF1E",
  Kotlin:       "#7F52FF",
  Go:           "#00ADD8",
  Rust:         "#CE422B",
  "C++":        "#00599C",
  Swift:        "#FA7343",
  Ruby:         "#CC342D",
  PHP:          "#777BB4",
  Scala:        "#DC322F",

  // ── Backend ────────────────────────────────────────────────────────────────
  "Spring Boot":  "#6DB33F",
  Spring:         "#6DB33F",
  FastAPI:        "#009688",
  "Node.js":      "#339933",
  Django:         "#0C4B33",
  Flask:          "#3D3D3D",
  Express:        "#3D3D3D",
  NestJS:         "#E0234E",
  Rails:          "#CC0000",
  Gin:            "#00ADD8",

  // ── AI / ML ────────────────────────────────────────────────────────────────
  "OpenAI API":       "#10A37F",
  "Anthropic Claude": "#CC785C",
  Anthropic:          "#CC785C",
  LangChain:          "#1C3C3C",
  Ollama:             "#4D4D4D",
  RAG:                "#6366F1",
  HuggingFace:        "#FF9D00",
  PyTorch:            "#EE4C2C",
  TensorFlow:         "#FF6F00",
  "scikit-learn":     "#F89939",
  LLM:                "#7C3AED",

  // ── Database ───────────────────────────────────────────────────────────────
  PostgreSQL:     "#4169E1",
  MySQL:          "#4479A1",
  MongoDB:        "#47A248",
  Redis:          "#DC382D",
  Elasticsearch:  "#005571",
  SQLite:         "#003B57",
  Cassandra:      "#1287B1",
  DynamoDB:       "#FF9900",

  // ── Messaging / Infra ─────────────────────────────────────────────────────
  "Apache Kafka": "#231F20",
  Kafka:          "#231F20",
  RabbitMQ:       "#FF6600",
  Docker:         "#2496ED",
  Kubernetes:     "#326CE5",
  AWS:            "#FF9900",
  GCP:            "#4285F4",
  Azure:          "#0078D4",
  Nginx:          "#009639",
  Terraform:      "#7B42BC",
  "GitHub Actions": "#2088FF",
  Linux:          "#FCC624",

  // ── Frontend ───────────────────────────────────────────────────────────────
  "Next.js":      "#AAAAAA",
  React:          "#61DAFB",
  "Vue.js":       "#4FC08D",
  "Tailwind CSS": "#06B6D4",
  Astro:          "#BC52EE",
  Svelte:         "#FF3E00",
  "Angular":      "#DD0031",
  "GraphQL":      "#E10098",

  // ── Tools ──────────────────────────────────────────────────────────────────
  Git:      "#F05032",
  GitHub:   "#6E40C9",
  gRPC:     "#244C5A",
  Jupyter:  "#F37626",

  // ── Services / Platforms ──────────────────────────────────────────────────
  "Kakao Maps": "#FEE500",
  Discord:      "#5865F2",
  Notion:       "#000000",

  // ── Concepts / Patterns ───────────────────────────────────────────────────
  DDD:    "#8B5CF6",
  TUI:    "#14B8A6",
  PWA:    "#5A0FC8",
  OpenAI: "#10A37F",
};
