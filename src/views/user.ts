import { GithubRepoType } from '@/helpers/getGithubUserRepos';
import { UserDocument } from '@/models/user';
import { RawDataType } from '@/types/user';

export const buildRawDataView = (rawData: RawDataType) => {
  return {
    login: rawData.login,
    orgs: rawData.orgs?.map(({ id, login, url, repos_url, repos }) => ({
      id,
      login,
      url,
      repos_url,
      repos: repos?.map(
        ({ id, name, full_name, url, git_url, isIncluded }) => ({
          id,
          name,
          full_name,
          url,
          git_url,
          isIncluded,
        })
      ),
    })),
  };
};

export const buildUserView = ({ id, email, name, rawData }: UserDocument) => {
  return {
    id,
    email,
    name,
    ...(rawData && {
      data: buildRawDataView(rawData),
    }),
  };
};

export const buildUserRepo = ({
  id,
  name,
  full_name,
  private: privateRepo,
}: GithubRepoType) => {
  return {
    id,
    name,
    private: privateRepo,
    fullName: full_name,
  };
};
