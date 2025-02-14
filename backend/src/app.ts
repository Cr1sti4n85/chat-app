import express, { Application } from "express";
import authRouter from "./routes/auth.route";
import { EnvConfiguration } from "config/envConfiguration";
import "./lib/db";
import { errorHandler, notFound } from "middleware/error.middleware";

const app: Application = express();
const port = EnvConfiguration().port;

app.use(express.json());

app.use("/api/auth", authRouter);

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
