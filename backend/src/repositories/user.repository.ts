import { Query } from "types/repository.types";
import UserModel from "../models/user.model";
import { IUserRepository, User } from "../types/user.types";

export class UserRepository implements IUserRepository {
  async create(data: User): Promise<User> {
    const newUser = new UserModel(data);
    return await newUser.save();
  }
  async findOne(query: Query): Promise<User | null> {
    return await UserModel.findOne(query);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string): Promise<User | null> {
    return await UserModel.findById(id).select("-password");
  }

  async findAll(id: string): Promise<User[]> {
    return await UserModel.find({ _id: { $ne: id } }).select("-password");
  }
}
