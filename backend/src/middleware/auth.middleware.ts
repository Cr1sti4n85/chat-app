import jwt from "jsonwebtoken";
import asyncHandler from "../lib/asyncHandler";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { IUserRepository, IUserService, User } from "../types/user.types";
import { EnvConfiguration } from "../config/envConfiguration";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    const jwtSecret = EnvConfiguration().secret as string;

    //Read the jwt from the cookie
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret) as User;
        console.log(decoded);
        const getUser = await userService.findUserById(decoded.id);

        if (!getUser) {
          res.status(404);
          throw new Error("User not found");
        }
        req.currentUser = getUser;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, Invalid or failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
