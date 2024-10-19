import { UserService } from '@/services/userService';
import { buildUserView } from '@/views/user';
import { Request, Response } from 'express';
import { UnauthorizedError } from 'restify-errors';

export const getUser = async (req: Request, res: Response) => {
  const { user } = req;

  const userService = new UserService();

  const userData = await userService.getByIdOrEmailOrExternalId({
    id: user!.id,
  });

  if (!userData) {
    throw new UnauthorizedError('You are not logged in.');
  }

  res.status(200).json(buildUserView(userData));
};
