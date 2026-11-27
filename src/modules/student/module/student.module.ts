import mysqlPool from "../../../config.ts/mysql.js";
import { StudentController } from "../controllers/student.controller.js";
import { StudentRepository } from "../repository/student.repository.js";
import { StudentService } from "../services/student.service.js";
import { StudentSyncService } from "../services/student.sync.service.js";

const studentRepository= new StudentRepository(mysqlPool)
const studentSyncService= new StudentSyncService()

const studentService= new StudentService(studentRepository, studentSyncService)

export const studentController= new StudentController(studentService)

