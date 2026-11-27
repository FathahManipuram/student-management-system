import { CreateStudentDTO, Student, UpdateStudentDTO } from "./student.interface.js";

export interface IStudentRepository{

	create(data: CreateStudentDTO): Promise<Student>
	findAll():Promise<Student[]>;
	findById(id: number): Promise<Student | null>;
	update(id: number, data: UpdateStudentDTO): Promise<Student | null>;
	delete(id: number): Promise<boolean>;
}