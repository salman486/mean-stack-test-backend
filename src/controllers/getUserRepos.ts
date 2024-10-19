import { UserService } from '@/services/userService';
import { buildUserRepo } from '@/views/user';
import { Request, Response } from 'express';

export const getUserRepos = async (req: Request, res: Response) => {
  const { user } = req;

  const userService = new UserService();

  const repos = (await userService.getUserRepos(user!.id)) ?? [];

  res.status(200).json(repos.map(buildUserRepo));
};
