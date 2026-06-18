// 포스트 id에서 폴더 이름을 카테고리로 추출합니다.
// 예: id = "backend/kafka-guide" → "backend"
//     id = "my-post"            → null (루트에 있는 파일)
export function getPostCategory(id: string): string | null {
  const parts = id.split("/");
  return parts.length > 1 ? parts[0] : null;
}
