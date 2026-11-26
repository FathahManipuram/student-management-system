import { RequestHandler } from "express";
import { StudentService } from "../services/student.service.js";
import { CreateStudentDTO } from "../interfaces/student.interface.js";
import { AppError } from "../../../shared/AppError.js";

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  createStudent: RequestHandler = async (req, res, next) => {
    try {
      const data = req.body as CreateStudentDTO;
      const student = await this.studentService.createStudent(data);

      res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: student,
      });
    } catch (err) {
      next(err);
    }
  };

  getAllStudent: RequestHandler = async (_req, res, next) => {
    try {
      const student = await this.studentService.getAllStudents();

      res.status(200).json({
        success: true,
        message: "Retrieved all students",
        data: student,
      });
    } catch (err) {
      next(err);
    }
  };

  getStudentById: RequestHandler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          success: false,
          message: "Invalid student ID",
        });
        return;
      }
      const student = await this.studentService.getStudentById(id);

      if (!student) {
        res.status(404).json({
          success: true,
          message: "Student not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Retrieved student successfully",
        data: student,
      });
    } catch (err) {
      next(err);
    }
  };

  updateStudent: RequestHandler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          success: false,
          message: "Invalid student ID",
        });
        return;
      }

      const student = await this.studentService.updateStudent(id, req.body);

      if (!student) {
        res.status(404).json({
          success: false,
          message: "Student not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteStudent: RequestHandler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          success: false,
          message: "Invalid student ID",
        });
        return;
      }

      const deleted = await this.studentService.deleteStudent(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Student not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Student deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
