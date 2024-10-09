import { Request } from 'express';
import { UserService } from '@/services/userService';
import { createUserData } from '@/views/createUserData';

interface ExternalAccountOptions {
  name: string;
  provider: string;
  externalId: string;
  email: string;
  rawData: Record<string, unknown>;
}

export const providerSignin = async (
  req: Request,
  userCreationOptions: ExternalAccountOptions,
  cb: any
) => {
  if (req.user) {
    cb(null, req.user);
    return;
  }

  const userService = new UserService();
  let user = await userService.getByEmailOrExternalId({
    email: userCreationOptions.email,
    externalId: userCreationOptions.externalId,
  });

  if (!user) {
    user = await userService.create(userCreationOptions);
  }

  cb(null, createUserData(user));
};
