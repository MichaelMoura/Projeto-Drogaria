import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface ICreateUserService {
  execute({ name, email, password, birth_date }: ICreateUserDTO): Promise<User>;
}
