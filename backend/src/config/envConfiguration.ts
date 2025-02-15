import { config } from "dotenv";

config();

const {
  PORT: port = 4000,
  MONGO_URI: mongoUri,
  JWT_SECRET: secret,
  NODE_ENV: nodeEnv,
  CLOUD_NAME: cloudName,
  CLOUD_API_SECRET: cloudSecret,
  CLOUD_API_KEY: cloudKey,
} = process.env;

export const EnvConfiguration = () => ({
  port,
  mongoUri,
  secret,
  nodeEnv,
  cloudName,
  cloudSecret,
  cloudKey,
});
