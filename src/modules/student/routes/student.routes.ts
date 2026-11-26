import { Router } from "express";

import { studentController } from "../module/student.module.js";
import { authenticate } from "../../../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate)

router.post("/", studentController.createStudent);
router.get("/", studentController.getAllStudent);

router.get("/:id", studentController.getStudentById);

router.patch("/:id", studentController.updateStudent);

router.delete("/:id", studentController.deleteStudent);

export default router