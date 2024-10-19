import { UserDocument } from '@/models/user';
import { buildRawDataView } from './user';

export const createUserTokenData = (
  user: UserDocument,
  token: {
    github: {
      accessToken: string;
      refreshToken: string;
    };
  }
) => {
  return {
    id: user.userId,
    email: user.email,
    name: user.name,
    rawData: buildRawDataView(user.rawData),
    token,
  };
};
