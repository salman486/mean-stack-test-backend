import User, { UserDocument } from '@/models/user';

export class UserService {
  async create(user: Partial<UserDocument>): Promise<UserDocument> {
    return User.create(user);
  }

  async getByEmailOrExternalId({
    email,
    externalId,
  }: {
    email?: string;
    externalId?: string;
  }): Promise<UserDocument | null> {
    if (!email && !externalId) {
      throw new Error(
        'Either email or externalId must be provided to get user'
      );
    }

    return User.findOne({ $or: [{ email }, { externalId }] });
  }
}
