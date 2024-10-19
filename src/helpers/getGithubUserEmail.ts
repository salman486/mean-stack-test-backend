import { GITHUB_API_BASE_URL } from '@/constants';

interface ResType {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function getGithubUserEmail(accessToken: string) {
  const res = await fetch(`${GITHUB_API_BASE_URL}/user/emails`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const userEmails: ResType[] = await res.json();

  return userEmails?.find?.((list) => list.primary)?.email;
}
