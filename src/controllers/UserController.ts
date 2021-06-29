import { Request } from "express";
import { Response } from "express-serve-static-core";
import { CreateUserService } from "../service/CreateUserService";

class UserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, birth_date } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      birth_date,
    });

    return response.json(user);
  }
}

export { UserController };
