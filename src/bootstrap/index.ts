import mongoose from "mongoose";
import { config } from "@/config";

const initMongoDB = async () => {
  if (!config.databases.auth.url) {
    throw new Error("Mongo connection string missing");
  }
  if (!config.databases.auth.name) {
    throw new Error("Mongo Database Name missing");
  }
  await mongoose.connect(config.databases.auth.url, {
    dbName: config.databases.auth.name,
  });

  console.log("database connection established");
};

export const bootstrap = async () => {
  console.log("bootstraping...");

  await initMongoDB();
};
