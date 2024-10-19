import { RepoService } from '@/services/repoService';
import { Request, Response } from 'express';

export const getRepoDetails = async (req: Request, res: Response) => {
  const { user } = req;

  const repoService = new RepoService();

  const repoDetails = await repoService.getRepoDetails(
    user!.id,
    user!.token.github.accessToken
  );

  res.status(200).json(repoDetails);
};
