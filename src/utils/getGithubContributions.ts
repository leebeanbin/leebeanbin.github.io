export type ContributionDay = {
  date: string;
  contributionCount: number;
};

export type ContributionData = {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
};

export async function getGithubContributions(): Promise<ContributionData | null> {
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
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }`,
      }),
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch {
    return null;
  }
}
