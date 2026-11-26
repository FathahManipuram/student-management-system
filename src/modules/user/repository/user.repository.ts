import { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { IUserRepository } from "../interfaces/IUserRepository.js";
import { RegisterUserDTO, User } from "../interfaces/user.interface.js";
import { AppError } from "../../../shared/AppError.js";



interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  created_at: Date;
  updated_at: Date;
}


export class UserRepository implements IUserRepository{
	constructor(private readonly db: Pool){}

	async create(data: RegisterUserDTO & { password_hash: string; }): Promise<User> {
		const [result]= await this.db.execute<ResultSetHeader>(
			`INSERT INTO users(name, email, password_hash)
			VALUES(?, ?, ?)`,
			[data.name, data.email, data.password_hash]
		)

		const user= await this.findById(result.insertId)
		if(!user){
			throw new AppError("User creation failed")
		}

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const [rows]= await this.db.execute<UserRow[]>(`
		SELECT * FROM users WHERE email=?`, [email])

		return rows[0] ?? null
	}

	async findById(id: number): Promise<User | null> {
		const [rows]= await this.db.execute<UserRow[]>(
			`SELECT * FROM users WHERE id=?`,
			[id]
		)

		return rows[0] ?? null
	}
}