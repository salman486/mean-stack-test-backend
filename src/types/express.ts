/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
    }
  }
}

export {};
