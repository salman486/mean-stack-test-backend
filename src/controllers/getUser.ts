import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  const { user } = req;

  res.status(200).json(user);
};
