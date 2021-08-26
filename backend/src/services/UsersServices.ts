import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async listAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async create(
    email: string,
    type: number,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> {
    const userExists = await this.usersRepository.findOne({ email });

    if (userExists) throw new AppError("User already exists!", 401);

    const user = new User();
    user.email = email;
    user.type = type;
    user.firstName = firstName;
    user.lastName = lastName;
    user.hashPassword(password);

    const userCreated = this.usersRepository.create(user);

    await this.usersRepository.save(userCreated);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }

  async findById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    return user;
  }
}

export { UsersService };
