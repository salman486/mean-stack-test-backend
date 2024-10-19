import { Request } from 'express';
import { UserService } from '@/services/userService';
import { createUserTokenData } from '@/views/createUserData';
import { getGithubUserReposByOrgId } from '@/helpers/getGithubUserRepos';
import { logger } from '@/logging';
import { getGithubUserOrgs } from '@/helpers/getGithubUserOrgs';

interface ExternalAccountOptions {
  name: string;
  provider: string;
  externalId: string;
  email?: string;
  rawData: Record<string, unknown>;
  accessToken: string;
  refreshToken: string;
}

export const providerSignin = async (
  req: Request,
  userCreationOptions: ExternalAccountOptions,
  cb: any
) => {
  if (req.user) {
    cb(null, req.user);
    return;
  }

  const userService = new UserService();
  let user = await userService.getByIdOrEmailOrExternalId({
    email: userCreationOptions.email,
    externalId: userCreationOptions.externalId,
  });

  const { accessToken, refreshToken, ...options } = userCreationOptions;

  if (!user) {
    // fetch user orgs
    try {
      const orgs = await getGithubUserOrgs(accessToken);

      const orgsWithrepos = await Promise.all(
        orgs.map(async (org) => {
          try {
            const orgRepos = await getGithubUserReposByOrgId(
              accessToken,
              org.login
            );

            return { ...org, repos: orgRepos };
          } catch {
            return org;
          }
        })
      );

      options.rawData = options.rawData ?? {};

      options.rawData.orgs = orgsWithrepos;
    } catch (err) {
      logger.error(
        { userCreationOptions },
        `Failed to fetch user orgs, err: ${err}`
      );
    }

    user = await userService.create(options);
  }

  cb(
    null,
    createUserTokenData(user, {
      github: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    })
  );
};
