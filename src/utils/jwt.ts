import jwt from 'jsonwebtoken'
import { User } from '../modules/user/interfaces/user.interface.js';


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

export const verifyToken= (token: string, secret: string)=>{
	return jwt.verify(token, secret)
}