import "./providers";

import { Express } from "express";
import passport from "passport";
import session from "express-session";
import { RequestHandler } from "express";
import { config } from "@/config";

let passportMiddleware: RequestHandler[];

export function initializePassport(app: Express) {
  if (!passportMiddleware) {
    passportMiddleware = [
      session({
        name: "token",
        secret: config.session.secret,
        resave: false,
        saveUninitialized: false,
        cookie: config.session.cookie,
        // TODO: in productin, use redis store
      }),
      passport.initialize(),
      passport.session(),
    ];

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj: any, done) => {
      done(null, obj);
    });
  }

  app.use(passportMiddleware);
}
