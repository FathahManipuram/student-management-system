
export type UserRole= "admin" | "user"

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface RegisterUserDTO{
	name: string;
	email: string;
	password: string;
}

export interface LoginUserDTO {
	email: string
	password: string
}

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}
