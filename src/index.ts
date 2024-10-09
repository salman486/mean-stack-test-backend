import express from "express";
import cookieParser from "cookie-parser";
import { routes } from "@/routes";
import { initializePassport } from "./middlewares/initialize-passport";
import { bootstrap } from "./bootstrap";
import { config } from "./config";
import { logger } from "./logging";

const app = express();
const port = config.port;

bootstrap().then(() => {
  app.use(cookieParser());

  initializePassport(app);

  routes(app);

  app.listen(port, () => {
    logger.info(`Server is running at port ${port}`);
  });
});
