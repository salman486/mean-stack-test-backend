export interface RawDataType {
  login: string;
  orgs: {
    id: number;
    login: string;
    url: string;
    repos_url: string;
    repos: {
      id: number;
      name: string;
      full_name: string;
      url: string;
      git_url: string;
      isIncluded?: boolean;
    }[];
  }[];
}
