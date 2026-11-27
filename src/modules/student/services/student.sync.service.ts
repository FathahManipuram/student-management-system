import { Student } from "../interfaces/student.interface.js"
import { StudentSyncModel } from "../model/student.model.js"

export class StudentSyncService{
	private async retry(
		operation:()=> Promise<void>,
		maxAttempts = 3
	): Promise<void>{

		for(let attempt= 1; attempt<=maxAttempts; attempt++){
			try{
				await operation()
				return
			}catch(err){
				console.error(`Mongodb Sync attemp ${attempt} faild: `,err)

				if(attempt===maxAttempts){
					throw err
				}

				await new Promise((resolve)=>{
					setTimeout(resolve, 1000 * attempt)
				})
			}
		}
	}


	async syncStudent(student: Student): Promise<void>{
		await this.retry(async()=>{
			await StudentSyncModel.findOneAndUpdate(
				{sqlStudentId: student.id},
				{
					$set:{
						sqlStudentId: student.id,
						name: student.name,
						email: student.email,
						age: student.age,
						course: student.course,
						syncedAt: new Date()
					}
				},
				{upsert: true, new: true}
			)
		})
	}


	async deleteSyncedStudent(id: number): Promise<void>{
		await this.retry(async ()=>{
			await StudentSyncModel.deleteOne({sqlStudentId: id})
		})
	}
}