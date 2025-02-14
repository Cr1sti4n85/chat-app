import { Query } from "types/repository.types";
import { IUserRepository, IUserService, User } from "../types/user.types";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(data: User): Promise<User> {
    return this.userRepository.create(data);
  }

  async findOne(query: Query): Promise<User | null> {
    return this.userRepository.findOne(query);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, data);
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
