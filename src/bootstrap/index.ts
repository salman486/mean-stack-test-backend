import mongoose from 'mongoose';
import { config } from '@/config';
import { logger } from '@/logging';

const initMongoDB = async () => {
  if (!config.databases.auth.url) {
    throw new Error('Mongo connection string missing');
  }
  if (!config.databases.auth.name) {
    throw new Error('Mongo Database Name missing');
  }
  await mongoose.connect(config.databases.auth.url, {
    dbName: config.databases.auth.name,
  });

  logger.info(`database connection established`);
};

export const bootstrap = async () => {
  logger.info(`Bootstraping application...`);

  await initMongoDB();
};
