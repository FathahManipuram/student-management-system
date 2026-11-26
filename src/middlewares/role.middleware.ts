import { RequestHandler } from "express";
import { UserRole } from "../modules/user/interfaces/user.interface.js";
import { AppError } from "../shared/AppError.js";

export const authorize= (...allowedRoles: UserRole[]): RequestHandler=>{
	return (req, res, next)=>{
		const authUser= res.locals.authUser as{
			id: number;
			role: UserRole
		} | undefined

		if (!authUser) {
			next(new AppError("Authentication required", 401));
      		return;
		}

		if(!allowedRoles.includes(authUser.role)){
			next(new AppError("You do not have permission to perform this action", 403));
      		return;
		}

		next()
	}

}