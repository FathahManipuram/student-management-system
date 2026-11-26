import express from 'express'
import { errorHandler } from './middlewares/error.middleware.js'
import studentRoutes from "../src/modules/student/routes/student.routes.js";
import userRoutes from "../src/modules/user/routes/user.routes.js"

const app= express()

app.use(express.json())

app.get("/health", (req, res)=>{
	res.status(200).json({
		success: true,
		message: "Student management api is running"
	})
})

app.use("/api/students", studentRoutes)
app.use("/api/users", userRoutes)


app.use(errorHandler)


export default app