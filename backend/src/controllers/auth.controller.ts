import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { IUserRepository, IUserService } from "../types/user.types";
import { generateToken } from "../lib/generateToken";
import asyncHandler from "../lib/asyncHandler";
import { UploadApiResponse } from "cloudinary";
import { uploadImage } from "../lib/uploadImage";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  const userExists = await userService.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await userService.createUser({ fullName, email, password });

  if (user && user._id) {
    generateToken(res, user._id.toString());
    res.status(201).json({
      _id: user._id,
      name: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await userService.findOne({ email });

  if (!userExists || !(await userExists.matchPassword(password))) {
    res.status(400);
    throw new Error("Invalid credentials. Try again");
  }

  if (userExists._id) generateToken(res, userExists._id.toString());

  res.status(200).json({
    _id: userExists._id,
    name: userExists.fullName,
    email: userExists.email,
    profilePic: userExists.profilePic,
  });
});

export const logout = (_req: Request, res: Response) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged out succesfully" });
};

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { profilePic } = req.body;
    const userId = req.currentUser._id as string;

    if (!profilePic) {
      res.status(400);
      throw new Error("Profile pic is required");
    }

    const uploadResponse: UploadApiResponse = await uploadImage(profilePic);
    // const uploadResponse: UploadApiResponse = await cloudinary.uploader.upload(
    //   profilePic
    // );
    const updatedUser = await userService.updateUser(userId, {
      profilePic: uploadResponse.secure_url,
    });

    res.status(200).json(updatedUser);
  }
);

export const checkAuthenticated = asyncHandler(
  (req: Request, res: Response) => {
    res.status(200).json(req.currentUser);
  }
);
