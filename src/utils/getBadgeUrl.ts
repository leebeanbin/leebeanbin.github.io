import { TECH_COLORS } from "@/data/techColors";

// Simple Icons 슬러그 맵 (shields.io logo= 파라미터)
// https://simpleicons.org 에서 slug 확인
const BADGE_LOGOS: Record<string, string> = {
  // Languages
  Python:        "python",
  Java:          "openjdk",
  TypeScript:    "typescript",
  JavaScript:    "javascript",
  Kotlin:        "kotlin",
  Go:            "go",
  Rust:          "rust",
  "C++":         "cplusplus",
  Swift:         "swift",
  Ruby:          "ruby",
  PHP:           "php",
  Scala:         "scala",

  // Backend
  "Spring Boot": "springboot",
  Spring:        "spring",
  FastAPI:       "fastapi",
  "Node.js":     "nodedotjs",
  Django:        "django",
  Flask:         "flask",
  Express:       "express",
  NestJS:        "nestjs",
  Rails:         "rubyonrails",
  Gin:           "go",

  // AI / ML
  "OpenAI API":       "openai",
  OpenAI:             "openai",
  Anthropic:          "anthropic",
  "Anthropic Claude": "anthropic",
  HuggingFace:        "huggingface",
  PyTorch:            "pytorch",
  TensorFlow:         "tensorflow",
  "scikit-learn":     "scikitlearn",

  // Database
  PostgreSQL:    "postgresql",
  MySQL:         "mysql",
  MongoDB:       "mongodb",
  Redis:         "redis",
  Elasticsearch: "elasticsearch",
  SQLite:        "sqlite",
  Cassandra:     "apachecassandra",
  DynamoDB:      "amazondynamodb",

  // Infra / Messaging
  "Apache Kafka": "apachekafka",
  Kafka:          "apachekafka",
  RabbitMQ:       "rabbitmq",
  Docker:         "docker",
  Kubernetes:     "kubernetes",
  AWS:            "amazonaws",
  GCP:            "googlecloud",
  Azure:          "microsoftazure",
  Nginx:          "nginx",
  Terraform:      "terraform",
  "GitHub Actions": "githubactions",
  Linux:          "linux",

  // Frontend
  "Next.js":     "nextdotjs",
  React:         "react",
  "Vue.js":      "vuedotjs",
  "Tailwind CSS":"tailwindcss",
  Astro:         "astro",
  Svelte:        "svelte",
  Angular:       "angular",
  GraphQL:       "graphql",

  // Tools / Platforms
  Git:           "git",
  GitHub:        "github",
  Jupyter:       "jupyter",
  Discord:       "discord",
  Notion:        "notion",
  PWA:           "pwa",
};

/**
 * shields.io 뱃지 URL 생성
 * @param tech  기술명 (TECH_COLORS 키와 동일)
 * @param style shields.io 스타일 ('flat-square' | 'flat' | 'for-the-badge')
 */
export function getBadgeUrl(tech: string, style = "flat-square"): string {
  const hex = (TECH_COLORS[tech] ?? "#6366F1").replace("#", "");
  const logo = BADGE_LOGOS[tech];

  // shields.io 레이블 인코딩: 공백→_, 하이픈→--
  const label = encodeURIComponent(tech.replace(/-/g, "--").replace(/ /g, "_"));

  // 배경이 밝으면 로고/텍스트 색상을 dark로
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const logoColor = luminance > 0.55 ? "000000" : "ffffff";

  const base = `https://img.shields.io/badge/${label}-${hex}?style=${style}`;
  return logo ? `${base}&logo=${logo}&logoColor=${logoColor}` : base;
}
