import { IUserRepository, IUserService, User } from "../types/user.types";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(data: User): Promise<User> {
    return this.userRepository.create(data);
  }
}
