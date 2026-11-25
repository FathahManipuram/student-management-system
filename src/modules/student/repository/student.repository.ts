import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise"
import { IStudentRepository } from "../interfaces/IStudentRepository.js"
import { CreateStudentDTO, Student, UpdateStudentDTO } from "../interfaces/student.interface.js"
import { AppError } from "../../../shared/AppError.js"

interface StudentRow extends RowDataPacket{
	id: number,
	name: string
	email: string
	age: number
	course: string
	created_at: Date
	updated_at: Date
}

export class StudentRepository implements IStudentRepository{
	constructor(private readonly db: Pool){}


	async findById(id: number): Promise<Student | null> {
		const [rows]= await this.db.execute<StudentRow[]>(
			`SELECT * FROM students WHERE id=?`, [id])

		return rows[0] ?? null
	}

	async findAll(): Promise<Student[]> {
		const [rows]= await this.db.query<StudentRow[]>(
			`SELECT * FROM students ORDER BY id DESC`
		)

		return rows
	}



	async create(data: CreateStudentDTO): Promise<Student> {
		const [result]= await this.db.execute<ResultSetHeader>(
			`INSERT INTO students(name, email, age, course)
			VALUES(?, ?, ?, ?)`,[data.name, data.email, data.age, data.course]
		)

		const student= await this.findById(result.insertId)

		if(!student){
			throw new AppError("Student creation failed")
		}

		return student
	}


	async update(id: number, data: UpdateStudentDTO): Promise<Student | null> {

		const student= await this.findById(id)

		if(!student) return null

		if(data.name!==undefined){
			student.name= data.name
		}

		if(data.email!==undefined){
			student.email= data.email
		}
		
		const [result]= await this.db.execute<ResultSetHeader>(
			`UPDATE students
			SET name=? , email= ?, age= ?, course=?
			WHERE id=?`, 
			[student.name, student.email, student.age, student.course, id]
		)


		if(result.affectedRows===0) return null

		return student

	}

	async delete(id: number): Promise<boolean> {
		const [rows]= await this.db.execute<ResultSetHeader>(
			`DELETE FROM students WHERE id=?`, [id]
		)

		return rows.affectedRows>0
	}
}