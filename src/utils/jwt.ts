import jwt from 'jsonwebtoken'
import { User } from '../modules/user/interfaces/user.interface.js';

const secret= process.env.SECRET_KEY

export const generateToken= (user: User, secret: string)=>{
return jwt.sign(
	{
		sub: user.id,
		role: user.role
	},
	secret,
	{
		expiresIn: 86400,
	}

);
} 