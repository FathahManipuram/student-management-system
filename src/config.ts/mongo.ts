import mongoose from 'mongoose'
import { configDotenv } from "dotenv"
configDotenv()


export const connectMongoDB= async():Promise<void>=>{
try{
	const mongoUri= process.env.MONGO_URI
if(!mongoUri){
	throw new Error("MONGO_URI is not configured")
}

await mongoose.connect(mongoUri)
console.log("MongoDB connected successfully")

}catch(error){
console.error("MongoDB connection failed: ", error)
throw error
}
}