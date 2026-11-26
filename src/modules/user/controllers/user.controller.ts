import { RequestHandler } from "express";
import { UserService } from "../services/user.service.js";
import { RegisterUserDTO } from "../interfaces/user.interface.js";

export class UserController {
  constructor(private readonly userService: UserService) {}

  register: RequestHandler = async (req, res, next) => {
    try {
      const data = req.body as RegisterUserDTO;

      const user = await this.userService.registerUser(data);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  login: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.userService.loginUser(req.body);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}