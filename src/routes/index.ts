import { Express, Request, Response } from 'express';

import v1Routes from './v1';
import { errorHandler } from '@/middlewares/error-handler';

export const routes = (app: Express) => {
  app.get('/status', (_: Request, response: Response) => {
    response.status(200).send('ok');
  });

  app.use(`/api/v1`, v1Routes());

  app.use((_, res: Response) => {
    res.status(404).json({ message: 'This route is not implemented' });
  });

  app.use(errorHandler);
};
