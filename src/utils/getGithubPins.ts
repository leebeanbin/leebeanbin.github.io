// GitHub 핀된 레포를 빌드 시 GraphQL로 가져옵니다.
// GITHUB_TOKEN 없으면 null 반환 → projects.ts 폴백 사용.
// 필터: 프로필 레포·블로그 레포·튜토리얼 등 제외.

const SKIP = new Set([
  "leebeanbin",
  "leebeanbin.github.io",
  "LangChain-OpenTutorial",
]);

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  primaryLanguage: { name: string } | null;
  stargazerCount: number;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
};

export async function getGithubPinnedRepos(): Promise<GithubRepo[] | null> {
  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          user(login: "leebeanbin") {
            pinnedItems(first: 6, types: [REPOSITORY]) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  primaryLanguage { name }
                  stargazerCount
                  repositoryTopics(first: 5) {
                    nodes { topic { name } }
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const repos: GithubRepo[] =
      data?.data?.user?.pinnedItems?.nodes ?? [];
    return repos.filter(r => !SKIP.has(r.name));
  } catch {
    return null;
  }
}
