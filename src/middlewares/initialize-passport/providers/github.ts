import { config } from "@/config";
import { providerSignin } from "@/controllers/providerSignin";
import { getGithubUserEmail } from "@/helpers/getGithubUserEmail";
import { Request } from "express";
import passport from "passport";
import { BadRequestError } from "restify-errors";

const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: config.auth.github.clientId,
      clientSecret: config.auth.github.clientSecret,
      callbackURL: `${config.apiUrl}/api/v1/auth/github/callback`,
      passReqToCallback: true,
      state: true,
      scopes: ["user:email"],
    },
    async function (
      req: Request,
      accessToken: string,
      _refreshToken: string,
      profile: any,
      cb: any
    ) {
      const email = await getGithubUserEmail(accessToken);

      if (!email) {
        throw new BadRequestError(
          "Failed to retrieve user email, please make sure you social media provider has associated email address"
        );
      }

      providerSignin(
        req,
        {
          name: profile.username,
          provider: "github",
          externalId: profile.id,
          email,
          rawData: profile._json,
        },
        cb
      );
    }
  )
);
