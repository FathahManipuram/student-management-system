import express from 'express'
import studentRoutes from "../src/modules/student/routes/student.routes.js"
import { errorHandler } from './middlewares/error.middleware.js'


const app= express()

app.use(express.json())

app.get("/health", (req, res)=>{
	res.status(200).json({
		success: true,
		message: "Student management api is running"
	})
})

app.use("/api/students", studentRoutes)


app.use(errorHandler)


export default app