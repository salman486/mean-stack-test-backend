import { logger } from '@/logging';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'restify-errors';

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500;

  const errorMessage =
    statusCode === 500
      ? 'Internal Server Error'
      : err.message || 'Internal Server Error';
  const errorName = err.name || 'Error';

  const errorResponse: Record<string, any> = {
    statusCode,
    message: errorMessage,
    error: errorName,
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  if (statusCode === 500) {
    logger.error(err, 'Internal Server Error');
  }

  res.status(statusCode).json(errorResponse);
}

export const errorWrapper =
  (fn: Handler) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
