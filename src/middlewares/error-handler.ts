import { NextFunction, Request, Response } from "express";
import { HttpError } from "restify-errors";

export function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const errorMessage =
    statusCode === 500
      ? "Internal Server Error"
      : err.message || "Internal Server Error";
  const errorName = err.name || "Error";

  const errorResponse: Record<string, any> = {
    statusCode,
    message: errorMessage,
    error: errorName,
  };

  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
}
