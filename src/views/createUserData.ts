import { UserDocument } from '@/models/user';

export const createUserData = (user: UserDocument) => {
  return {
    id: user.userId,
    email: user.email,
    name: user.name,
  };
};
