import { getGithubRepoDetails } from '@/helpers/getGithubRepoDetails';
import { UserService } from './userService';
import { RawDataType } from '@/types/user';
import { BadRequestError } from 'restify-errors';

export class RepoService {
  async setRepoIncluded({
    repoId,
    userId,
    isIncluded,
  }: {
    repoId: number;
    userId: string;
    isIncluded: boolean;
  }) {
    const userService = new UserService();
    const user = await userService.getByIdOrEmailOrExternalId({ id: userId });

    let repo;

    const orgs = (user?.rawData as RawDataType).orgs.map((org) => {
      return {
        ...org,
        repos: org.repos?.map((orgRepo) => {
          let isIncludedRepo = orgRepo.isIncluded;

          if (orgRepo.id === repoId) {
            repo = orgRepo;
            isIncludedRepo = isIncluded;
          }

          return {
            ...orgRepo,
            isIncluded: isIncludedRepo,
          };
        }),
      };
    });

    if (!repo) {
      throw new BadRequestError(`Repo not found with id ${repoId}`);
    }

    const updatedUser = await userService.findByIdAndUpdate(user?.id, {
      rawData: {
        ...user?.rawData,
        orgs,
      },
    });

    return updatedUser;
  }

  async getRepoDetails(userId: string, accessToken: string) {
    const userService = new UserService();
    const user = await userService.getByIdOrEmailOrExternalId({ id: userId });

    const activeRepos = (user?.rawData as RawDataType).orgs.flatMap((org) => {
      return org.repos?.filter((orgRepo) => {
        return orgRepo.isIncluded;
      });
    });

    const details = await Promise.all(
      activeRepos.map(async (repo) => {
        const details = await getGithubRepoDetails(accessToken, repo);
        return {
          id: repo.id,
          name: repo.name,
          details,
        };
      })
    );

    return details;
  }
}
