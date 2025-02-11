import express, { Application } from "express";
import authRouter from "./routes/auth.route";
import { EnvConfiguration } from "config/envConfiguration";
import "./lib/db";

const app: Application = express();
const port = EnvConfiguration().port;

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
