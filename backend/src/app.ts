import express, { Application } from "express";
import authRouter from "./routes/auth.route";

const app: Application = express();
const port = 5000;

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
