import { Document } from "mongoose";
import { Query, Repository } from "./repository.types";

export interface User extends Document {
  //   _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface IUserRepository extends Repository<User> {
  findOne(query: Query): Promise<User | null>;
}

export interface IUserService {
  createUser(data: Partial<User>): Promise<User>;
  findOne(query: Query): Promise<User | null>;
}
