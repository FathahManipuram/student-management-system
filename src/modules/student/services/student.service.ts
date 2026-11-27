import { AppError } from "../../../shared/AppError.js";
import { IStudentRepository } from "../interfaces/IStudentRepository.js";
import { CreateStudentDTO, Student, UpdateStudentDTO } from "../interfaces/student.interface.js";
import { StudentSyncService } from "./student.sync.service.js";

export class StudentService{
	constructor(
		private readonly studentRepository: IStudentRepository,
		private readonly studentSyncService: StudentSyncService
		){}

	async createStudent(data:CreateStudentDTO): Promise<Student>{


		const existingStudent= await this.getAllStudents()
		if(!data.name.trim()){
			throw new AppError("Name is required", 400)
		}

		if(!data.email.trim()){
			throw new AppError("Email is required", 400)
		}

		if(data.age<=0 || data.age>100){
			throw new AppError("Invalid student age", 400)
		}

		if(!data.course.trim()){
			throw new AppError("Course is required", 400)
		}

		const duplicateEmail = existingStudent.some(
      (student) => student.email === data.email,
    );

    if (duplicateEmail) {
      throw new AppError("Email already registered", 409);
    }

		const student = await this.studentRepository.create(data)

		try {
        await this.studentSyncService.syncStudent(student);
      } catch (error) {
        console.error(
          "Student created in MySQL, but MongoDB sync failed:",
          error,
        );
      }

		return student
	}


	async getAllStudents(): Promise<Student[]>{
		return this.studentRepository.findAll()
	}

	async getStudentById(id: number): Promise<Student | null>{
		return this.studentRepository.findById(id)
	}

	async updateStudent(id: number, data: UpdateStudentDTO): Promise<Student | null>{
		
		if(data.age){
			if(data.age<=0 || data.age>100){
			throw new AppError("Invalid student age", 400)
		}
		}

		const student = await this.studentRepository.update(id, data);

		if(student){
			try{
				await this.studentSyncService.syncStudent(student)
			}catch(error){
				console.error("Student updated in MySQL, but MongoDB sync failed:",error);
			}
		}
		return student
	}

	async deleteStudent(id: number): Promise<boolean>{
		const deleted= await this.studentRepository.delete(id)

		if(deleted){
			try{
				 await this.studentSyncService.deleteSyncedStudent(id);
			}catch(error){
				console.error("Student deleted in MySQL, but MongoDB sync failed:", error)
			}
		}

		return deleted
	}
}