import dotenv from 'dotenv';
import { CookieOptions } from 'express-session';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV,
  loggerLevel: process.env.LOG_LEVEL || 'info',
  port: process.env.SERVER_PORT || 3000,
  apiUrl: process.env.API_URL,
  siteUrl: process.env.SITE_URL || '/',
  auth: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  session: {
    secret: process.env.SESSION_SECRET || 'nope',
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: 'auto',
      domain: process.env.COOKIE_DOMAIN || '/',
      sameSite: 'strict',
    } as CookieOptions,
  },
  databases: {
    auth: {
      url: process.env.DB_CONNECTION_STRING,
      name: process.env.DB_NAME,
    },
  },
};
