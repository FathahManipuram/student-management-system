import { RegisterUserDTO, User } from "./user.interface.js";




export interface IUserRepository{
	findById(id: number): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	create(data: Omit<RegisterUserDTO, "password"> & {password_hash: string}): Promise<User>
}