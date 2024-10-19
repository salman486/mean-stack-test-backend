import { RepoService } from '@/services/repoService';
import { Request, Response } from 'express';

export const setRepoIncluded = async (req: Request, res: Response) => {
  const { user } = req;
  const isIncluded = req.body.isIncluded === true;

  const repoService = new RepoService();

  await repoService.setRepoIncluded({
    userId: user!.id,
    isIncluded: isIncluded,
    repoId: +req.params.repoId,
  });

  res.status(200).json({ isIncluded });
};
