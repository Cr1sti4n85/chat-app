import { NextFunction, Request, Response } from "express";
import { EnvConfiguration } from "../config/envConfiguration";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //check castError Mongo
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: EnvConfiguration().nodeEnv === "development" && err.stack,
  });
};

export { notFound, errorHandler };
