import { AppError } from "../../../shared/AppError.js";
import { hashPassword } from "../../../utils/hashpassword.js";
import { IUserRepository } from "../interfaces/IUserRepository.js";
import { RegisterUserDTO, SafeUser, User } from "../interfaces/user.interface.js";

export class UserService{
	constructor(private readonly userRepository: IUserRepository){}

	private toSafeUser(user: User):SafeUser{
		const{
			password_hash,
			...safeUser
		}= user

		return safeUser
	}

	async registerUser(data: RegisterUserDTO): Promise<SafeUser>{
		const email= data.email.trim().toLowerCase()

		const existingUser = await this.userRepository.findByEmail(email)

		if(existingUser){
			throw new AppError("Email already registered", 409)
		}

		const password_hash= await hashPassword(data.password)

		const user= await this.userRepository.create({
			name: data.name.trim(),
			email,
			password_hash
		})

		return this.toSafeUser(user)
	}
}