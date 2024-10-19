import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { usersRoutes } from './users.routes';
import { reposRoutes } from './repos.routes';

const v1Routes = () => {
  const v1Routes = Router();

  v1Routes.use('/auth', authRoutes());
  v1Routes.use('/users', usersRoutes());
  v1Routes.use('/repos', reposRoutes());

  return v1Routes;
};

export default v1Routes;
