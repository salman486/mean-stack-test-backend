import { Response, Router } from 'express';
import passport from 'passport';
import { config } from '@/config';

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

  authRoutes.get('/error', (_, res: Response) => {
    res.redirect(`${config.siteUrl}/account-link-error`);
  });

  return authRoutes;
};
