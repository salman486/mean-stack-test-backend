import { GITHUB_API_BASE_URL } from '@/constants';

export interface GithubRepoType {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  url: string;
}

export async function getGithubUserRepos(accessToken: string) {
  const res = await fetch(`${GITHUB_API_BASE_URL}/user/repos`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const userRepos: GithubRepoType[] = await res.json();

  return userRepos;
}

export async function getGithubUserReposByOrgId(
  accessToken: string,
  name: string
) {
  const res = await fetch(`${GITHUB_API_BASE_URL}/orgs/${name}/repos`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const userRepos: GithubRepoType[] = await res.json();

  return userRepos;
}
