import User, { UserDocument } from '@/models/user';
import { UpdateQuery } from 'mongoose';
import { BadRequestError } from 'restify-errors';

export class UserService {
  async create(user: Partial<UserDocument>): Promise<UserDocument> {
    return User.create(user);
  }

  async findByIdAndUpdate(userId: string, data: UpdateQuery<UserDocument>) {
    const result = await User.findByIdAndUpdate(userId, data, { new: true });

    if (!result) {
      throw new BadRequestError('User not found');
    }

    return result;
  }

  async getByIdOrEmailOrExternalId({
    id,
    email,
    externalId,
  }: {
    id?: string;
    email?: string | null;
    externalId?: string;
  }): Promise<UserDocument | null> {
    if (!id && !email && !externalId) {
      throw new Error('Id, email or externalId must be provided to get user');
    }

    return User.findOne({ $or: [{ email }, { externalId }, { userId: id }] });
  }

  async getUserRepos(userId: string) {
    const user = await User.findOne({ userId });

    const repos = user?.rawData?.repos ?? [];

    return repos;
  }
}
