import { Document } from "mongoose";
import { Repository } from "./repository.types";

export interface User extends Document {
  //   _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface IUserRepository extends Repository<User> {}
