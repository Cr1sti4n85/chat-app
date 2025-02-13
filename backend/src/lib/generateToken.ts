import { Response } from "express";
import jwt from "jsonwebtoken";
import { EnvConfiguration } from "../config/envConfiguration";

export const generateToken = (res: Response, id: string) => {
  const token = jwt.sign({ id }, EnvConfiguration().secret as string, {
    expiresIn: "7d",
  });

  //Set jwt as http only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //  days
  });
};
