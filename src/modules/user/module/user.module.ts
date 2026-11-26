import mysqlPool from "../../../config.ts/mysql.js";
import { UserController } from "../controllers/user.controller.js";
import { UserRepository } from "../repository/user.repository.js";
import { UserService } from "../services/user.service.js";

const userRepository= new UserRepository(mysqlPool)
const userService= new UserService(userRepository)
export const userController= new UserController(userService)