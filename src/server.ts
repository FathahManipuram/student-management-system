import app from "./app.js";
import { configDotenv } from "dotenv";
import { connectMySQL } from "./config.ts/mysql.js";
import { connectMongoDB } from "./config.ts/mongo.js";
configDotenv()

const port = Number(process.env.PORT ?? 5000)


const startServer= async()=>{
	try{
		await Promise.all([
			connectMySQL(),
			connectMongoDB()
		])

	app.listen(port, ()=>{
	console.log(`server is running on port ${port}`)
})
	}catch(error){
		console.error("Application startup failed: ", error)
		process.exit(1)
	}
}

startServer()