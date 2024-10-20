import { config } from '@/config';
import { providerSignin } from '@/controllers/providerSignin';
import { getGithubUserEmail } from '@/helpers/getGithubUserEmail';
import { Request } from 'express';
import passport from 'passport';

const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: config.auth.github.clientId,
      clientSecret: config.auth.github.clientSecret,
      callbackURL: `${config.apiUrl}/api/v1/auth/github/callback`,
      passReqToCallback: true,
      state: true,
      scope: ['read:user', 'user:email', 'read:org', 'repo'],
    },
    async function (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: any
    ) {
      const email = await getGithubUserEmail(accessToken);

      providerSignin(
        req,
        {
          name: profile.username,
          provider: 'github',
          externalId: profile.id,
          email,
          accessToken,
          refreshToken,
          rawData: profile._json,
        },
        cb
      );
    }
  )
);
