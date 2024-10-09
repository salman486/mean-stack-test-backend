import User from '@/models/user';
import { Request, Response } from 'express';

export const disconnectAccount = async (req: Request, res: Response) => {
  const { user } = req;

  await User.deleteOne({ userId: user!.id });

  res.clearCookie('token');

  res.status(201).json({});
};
