interface ResType {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function getGithubUserEmail(accessToken: string) {
  const res = await fetch('https://api.github.com/user/emails', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const userEmails: ResType[] = await res.json();

  return userEmails.find((list) => list.primary)?.email ?? null;
}
