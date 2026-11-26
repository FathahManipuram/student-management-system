import { AppError } from "../../../shared/AppError.js";
import { comparePassword } from "../../../utils/comparePassword.js";
import { hashPassword } from "../../../utils/hashpassword.js";
import { generateToken } from "../../../utils/jwt.js";
import { IUserRepository } from "../interfaces/IUserRepository.js";
import { LoginUserDTO, RegisterUserDTO, SafeUser, User } from "../interfaces/user.interface.js";

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

	async loginUser(data: LoginUserDTO){
		const email= data.email.trim().toLowerCase()

		const user= await this.userRepository.findByEmail(email)
		if(!user){
			 throw new AppError("Invalid email or password", 401);
		}

		const isPasswordValid= await comparePassword(data.password, user.password_hash)

		if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
      }

	  const secret = process.env.JWT_SECRET;
	   if (!secret) {
       throw new AppError("JWT secret is not configured", 500);
     }

	 const token= generateToken(user, secret)
	 return {
		user: this.toSafeUser(user),
		token,
	 }

	}
}