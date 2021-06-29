import { getCustomRepository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { ICreateUserService } from "../interfaces/ICreateUserService";
import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs";

class CreateUserService implements ICreateUserService {
  async execute({
    name,
    email,
    password,
    birth_date,
  }: ICreateUserDTO): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      birth_date,
    });

    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
