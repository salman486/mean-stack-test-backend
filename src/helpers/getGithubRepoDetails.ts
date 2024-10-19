import { GITHUB_API_BASE_URL } from '@/constants';
import { logger } from '@/logging';

interface User {
  login: string;
}

interface Commit {
  author: User | null;
}

interface PullRequest {
  user: User;
}

interface Issue {
  user: User;
  pull_request?: any;
}

async function fetchPaginatedData<T>(
  accessToken: string,
  url: string,
  perPage = 100
): Promise<T[]> {
  let page = 1;
  let hasMore = true;
  let allData: T[] = [];

  try {
    while (hasMore) {
      const response = await fetch(`${url}&per_page=${perPage}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data: T[] = await response.json();

      if (data.length > 0) {
        allData = allData.concat(data);
        page++;
      } else {
        hasMore = false;
      }
    }
  } catch (error) {
    logger.error(error, `Error fetching data from ${url}:`);
  }

  return allData;
}

const fetchCommits = async (
  accessToken: string,
  owner: string,
  name: string
) => {
  const url = `${GITHUB_API_BASE_URL}/repos/${owner}/${name}/commits?`;
  return fetchPaginatedData<Commit>(accessToken, url);
};

const fetchPullRequests = async (
  accessToken: string,
  owner: string,
  name: string
) => {
  const url = `${GITHUB_API_BASE_URL}/repos/${owner}/${name}/pulls?state=all`;
  return fetchPaginatedData<PullRequest>(accessToken, url);
};

const fetchIssues = async (
  accessToken: string,
  owner: string,
  name: string
): Promise<Issue[]> => {
  const url = `${GITHUB_API_BASE_URL}/repos/${owner}/${name}/issues?state=all`;
  const allIssues = await fetchPaginatedData<Issue>(accessToken, url);
  return allIssues.filter((issue) => !issue.pull_request);
};

const groupByUser = (
  commits: Commit[],
  prs: PullRequest[],
  issues: Issue[]
) => {
  const userStats: Record<
    string,
    { commits: number; prs: number; issues: number }
  > = {};

  const incrementCount = (
    username: string,
    type: keyof (typeof userStats)[string]
  ) => {
    if (!userStats[username]) {
      userStats[username] = { commits: 0, prs: 0, issues: 0 };
    }
    userStats[username][type] += 1;
  };

  commits.forEach((commit) => {
    const username = commit.author ? commit.author.login : 'Unknown';
    incrementCount(username, 'commits');
  });

  prs.forEach((pr) => {
    const username = pr.user ? pr.user.login : 'Unknown';
    incrementCount(username, 'prs');
  });

  issues.forEach((issue) => {
    const username = issue.user ? issue.user.login : 'Unknown';
    incrementCount(username, 'issues');
  });

  return Object.entries(userStats).map(([username, stats]) => ({
    username,
    ...stats,
  }));
};

export async function getGithubRepoDetails(accessToken: string, repo: any) {
  const commits = await fetchCommits(accessToken, repo.owner.login, repo.name);
  const prs = await fetchPullRequests(accessToken, repo.owner.login, repo.name);
  const issues = await fetchIssues(accessToken, repo.owner.login, repo.name);

  const groupedData = groupByUser(commits, prs, issues);

  return groupedData;
}
