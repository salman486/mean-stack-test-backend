import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.SERVER_PORT || 3000,
};
