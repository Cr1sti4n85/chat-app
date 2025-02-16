import express, { Application } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import messageRouter from "./routes/message.routes";
import { EnvConfiguration } from "./config/envConfiguration";
import "./lib/db";
import { errorHandler, notFound } from "./middleware/error.middleware";

const app: Application = express();
const port = EnvConfiguration().port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
