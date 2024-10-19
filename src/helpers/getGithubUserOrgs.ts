import { GITHUB_API_BASE_URL } from '@/constants';

interface ResType {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
}

export async function getGithubUserOrgs(accessToken: string) {
  const res = await fetch(`${GITHUB_API_BASE_URL}/user/orgs`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const userOrgs: ResType[] = await res.json();

  return userOrgs;
}
