import { AppError } from "../../../shared/AppError.js";
import { IStudentRepository } from "../interfaces/IStudentRepository.js";
import { CreateStudentDTO, Student, UpdateStudentDTO } from "../interfaces/student.interface.js";

export class StudentService{
	constructor(private readonly studentRepository: IStudentRepository){}

	async createStudent(data:CreateStudentDTO): Promise<Student>{

		const existingStudent= await this.getAllStudents()
		if(!data.name.trim()){
			throw new AppError("Name is required")
		}

		if(!data.email.trim()){
			throw new AppError("Email is required")
		}

		if(data.age<=0 || data.age>100){
			throw new AppError("Invalid student age")
		}

		if(!data.course.trim()){
			throw new AppError("Course is required")
		}

		const duplicateEmail = existingStudent.some(
      (student) => student.email === data.email,
    );

    if (duplicateEmail) {
      throw new AppError("Email already registered", 409);
    }

		const student = await this.studentRepository.create(data)

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
			throw new AppError("Invalid student age")
		}
		}
		return this.studentRepository.update(id, data)
	}

	async deleteStudent(id: number): Promise<boolean>{
		return this.studentRepository.delete(id)
	}
}