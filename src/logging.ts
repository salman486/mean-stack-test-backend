import Logger from 'bunyan';
import { config } from './config';

let varLogger: Logger;

function initializeLogger(): Logger {
  const streams = [
    {
      level: config.loggerLevel,
      stream: process.stdout,
    } as Logger.Stream,
  ];

  varLogger = Logger.createLogger({
    name: 'mean-stack-auth',
    streams,
    // Enabling src tracking is very slow and should not be used in production.
    // More info: https://www.npmjs.com/package/bunyan#src
    src: config.env !== 'production',
  });

  return varLogger;
}

export const logger = initializeLogger();
