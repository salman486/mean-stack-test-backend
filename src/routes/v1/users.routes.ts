import { Router } from 'express';
import { getUser } from '@/controllers/getUser';
import { requireUserMiddlware } from '@/middlewares/require-user';

export const usersRoutes = () => {
  const userRoutes = Router();

  userRoutes.use(requireUserMiddlware);

  userRoutes.get('/me', getUser);

  return userRoutes;
};
