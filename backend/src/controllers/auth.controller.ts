import { Request, Response } from "express";

export const signup = (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
};
export const login = (_req: Request, res: Response) => {
  res.send("Signup route");
};

export const logout = (_req: Request, res: Response) => {
  res.send("Signup route");
};
