export interface Student{
	id: number
	name: string
	email: string
	age: number
	course: string
	created_at: Date
	updated_at: Date
}

export interface CreateStudentDTO{
	name: string
	email: string
	age: number
	course:  string
}

export type UpdateStudentDTO= Partial<CreateStudentDTO>;