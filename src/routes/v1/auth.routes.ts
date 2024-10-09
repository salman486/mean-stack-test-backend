import { Response, Router } from 'express';
import passport from 'passport';
import { config } from '@/config';
import { requireUserMiddlware } from '@/middlewares/require-user';
import { disconnectAccount } from '@/controllers/disconnectAccount';
import { logger } from '@/logging';

export const authRoutes = () => {
  const authRoutes = Router();

  authRoutes.get(
    '/github',
    passport.authenticate('github', { failureRedirect: '/api/v1/auth/error' })
  );

  authRoutes.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/api/v1/auth/error' }),
    async (_req, res) => {
      res.redirect(config.siteUrl);
    }
  );

  authRoutes.delete('/disconnect', requireUserMiddlware, disconnectAccount);

  authRoutes.get('/error', (req, res: Response) => {
    logger.error({ session: req.session }, 'Error redirect');
    res.redirect(`${config.siteUrl}/login-error`);
  });

  return authRoutes;
};
