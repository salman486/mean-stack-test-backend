import { Router } from 'express';
import { requireUserMiddlware } from '@/middlewares/require-user';
import { setRepoIncluded } from '@/controllers/setRepoIncluded';
import { errorWrapper } from '@/middlewares/error-handler';
import { getRepoDetails } from '@/controllers/getRepoDetails';

export const reposRoutes = () => {
  const reposRoutes = Router();

  reposRoutes.use(requireUserMiddlware);

  reposRoutes.patch('/:repoId/included', errorWrapper(setRepoIncluded));
  reposRoutes.get('/details', errorWrapper(getRepoDetails));

  return reposRoutes;
};
