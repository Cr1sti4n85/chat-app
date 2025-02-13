import UserModel from "../models/user.model";
import { IUserRepository, User } from "../types/user.types";

export class UserRepository implements IUserRepository {
  async create(data: User): Promise<User> {
    const newUser = new UserModel(data);
    return await newUser.save();
  }
}
