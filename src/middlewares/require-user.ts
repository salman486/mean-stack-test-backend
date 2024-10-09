import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'restify-errors';

export const requireUserMiddlware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated() || !req.user) {
    throw new UnauthorizedError('You are not logged in');
  }

  next();
};
