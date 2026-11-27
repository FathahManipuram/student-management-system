import mysqlPool from "../../../config.ts/mysql.js";
import { StudentController } from "../controllers/student.controller.js";
import { StudentRepository } from "../repository/student.repository.js";
import { StudentService } from "../services/student.service.js";

const studentRepository= new StudentRepository(mysqlPool)

const studentService= new StudentService(studentRepository)

export const studentController= new StudentController(studentService)

