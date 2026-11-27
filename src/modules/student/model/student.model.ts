import mongoose, { Schema } from "mongoose"

export interface StudentSyncDocument{
	sqlStudentId: number
	name: string
	email: string
	age: number
	course: string
	syncedAt: Date
}


const studentSchema= new Schema<StudentSyncDocument>({
	sqlStudentId:{type: Number, required: true, unique: true},
	name: {type: String, required: true},
	email: {type: String, required: true},
	age: {type: Number, required: true},
	course: {type: String, requrired: true},
	syncedAt: {type: Date, default: Date.now}
},
{
	collection: "students"
}
)

export const StudentSyncModel= mongoose.model<StudentSyncDocument>(
	"StudentSync",
	studentSchema
)