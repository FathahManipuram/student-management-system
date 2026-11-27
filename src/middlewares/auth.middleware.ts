import { RequestHandler } from "express";
import jwt, { JwtPayload} from "jsonwebtoken";
import { AppError } from "../shared/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import { configDotenv } from "dotenv";
configDotenv()

interface AuthPayload extends JwtPayload{
	sub?: string
	role?: "admin" | "user"
}


export const authenticate : RequestHandler= (req, res, next)=>{
	try{
		const authHeader= req.headers.authorization;

		if(!authHeader || !authHeader.startsWith("Bearer ")){
			throw new AppError("Authentication token required", 401);
		}

		const token= authHeader?.split(" ")[1]

		
		if(!token){
			throw new AppError("Invalid authentication token", 401);
		}

		const secret = process.env.JWT_SECRET;
		

		const decoded = verifyToken(token, secret as string);

	
		 if (typeof decoded === "string") {
       throw new AppError("Invalid authentication token", 401);
     }

	 const payload= decoded as AuthPayload

	 const userId = Number(payload.sub);

	 if(
		!Number.isInteger(userId) || 
		userId <=0 || 
		!["admin", "user"].includes(payload.role ?? "")){
			throw new AppError("Invalid authentication token", 401);
		}

	 res.locals.authUser={
		id: userId,
		role: payload.role
	 }

	 next()

	}catch(err){
		if(err instanceof AppError){
			next(err)
			return
		}

		if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError
    ) {
      next(new AppError("Invalid or expired token", 401));
      return;
    }

		next(err)
	}
}

