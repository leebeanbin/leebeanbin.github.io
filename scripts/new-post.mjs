#!/usr/bin/env node
/**
 * 새 포스트 스켈레톤 생성 스크립트
 *
 * 사용법:
 *   pnpm new:post "제목"            → src/content/posts/2026-01-15-title.md
 *   pnpm new:post "제목" backend    → src/content/posts/backend/2026-01-15-title.md
 *   pnpm new:post "제목" ai/llm     → src/content/posts/ai/llm/2026-01-15-title.md
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const [, , rawTitle, ...categoryParts] = process.argv;
const category = categoryParts.join("/").replace(/^\/|\/$/g, "");

if (!rawTitle) {
  console.error("사용법: pnpm new:post \"제목\" [카테고리]");
  console.error('예시:  pnpm new:post "AI로 코드 리뷰하기" backend');
  process.exit(1);
}

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const today = new Date().toISOString().split("T")[0];
const slug = toSlug(rawTitle);
const fileName = `${today}-${slug}.md`;

const targetDir = join(__dirname, "../src/content/posts", category);
const filePath = join(targetDir, fileName);

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
  console.log(`📁 Created directory: src/content/posts/${category}`);
}

if (existsSync(filePath)) {
  console.error(`❌ File already exists: ${filePath}`);
  process.exit(1);
}

const pubDatetime = new Date().toISOString();
const tagsPlaceholder = category ? `["${category}"]` : "[]";

// 백틱 문자열 안에 backtick을 쓰기 위해 변수 사용
const TICK = "`";
const TICK3 = "```";

const content = `---
title: "${rawTitle}"
description: ""
pubDatetime: ${pubDatetime}
tags: ${tagsPlaceholder}
featured: false
draft: true
---

## 개요

<!-- 2-3문장으로 이 글의 핵심을 요약하세요 -->

---

## 배경 / 문제 정의

<!-- 왜 이 주제를 다루게 됐는지, 어떤 문제를 해결하는지 -->

> [!NOTE]
> 이 글에서 다루는 버전 정보 등을 여기에 적으세요

---

## 핵심 내용

### 소제목

본문을 작성하세요. 코드 블록 예시:

${TICK3}python title="main.py"
def example():
    return "hello"
${TICK3}

라인 강조 (${TICK}# [!code highlight]${TICK}):

${TICK3}python
def process(data):
    result = transform(data)  # [!code highlight]
    return result
${TICK3}

추가 / 삭제 diff:

${TICK3}python
- old_function()  # [!code --]
+ new_function()  # [!code ++]
${TICK3}

> [!TIP]
> 실제로 써봤을 때 도움이 된 팁을 여기에 적으세요

---

## 주요 개념 비교

| 항목 | A 방식 | B 방식 |
|------|--------|--------|
| 성능  | 빠름   | 보통   |
| 설정  | 복잡   | 간단   |

---

## 마무리

> [!WARNING]
> 주의사항이 있다면 여기에

- 이 글에서 다룬 핵심 포인트
- 다음 글 예고 또는 관련 링크

---

## 참고

- [링크 제목](https://example.com)
`;

writeFileSync(filePath, content, "utf-8");

const relPath = `src/content/posts/${category ? category + "/" : ""}${fileName}`;
console.log(`✅ Created: ${relPath}`);
console.log(`   Title: ${rawTitle}`);
if (category) console.log(`   Category: ${category}`);
console.log(`\n   draft: true → 작성 완료 후 false로 변경하세요`);
console.log(`   --- 구분선이 슬라이드 경계가 됩니다 (포스트 페이지 슬라이드 모드)`);
