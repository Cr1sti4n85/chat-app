import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { IUserRepository, IUserService } from "../types/user.types";
import asyncHandler from "../lib/asyncHandler";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  if (req.currentUser._id) {
    const loggedInUserId = req.currentUser._id.toString();
    const filteredUsers = await userService.findAllUsers(loggedInUserId);

    res.status(200).json(filteredUsers);
  }
});
