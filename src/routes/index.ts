import { Express, Request, Response } from "express";

import v1Routes from "./v1";

export const routes = (app: Express) => {
  app.get("/status", (_: Request, response: Response) => {
    response.status(200).send("ok");
  });

  app.use(`/api/v1`, v1Routes());
};
