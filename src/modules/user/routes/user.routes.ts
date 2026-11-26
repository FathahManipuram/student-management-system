import { Router } from "express";
import { userController } from "../module/user.module.js";

const router = Router();

router.post("/register", userController.register);

export default router;
