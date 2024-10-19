import { RawDataType } from './user';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      token: {
        github: {
          accessToken: string;
          refreshToken: string;
        };
      };
      rawData: RawDataType;
    }
  }
}

export {};
