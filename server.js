import express from "express"
import morgan from "morgan"
import cors from "cors"
import colors from "colors"
import dotevn from "dotenv"
import connectDb from "./config/db.js"

//import router
import testRouter from "./routes/testRouter.js"
import userRouter from "./routes/userRouter.js"

//dotenv conffig
dotevn.config()

//connect database with monggodb
connectDb()

const app = express()
//middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

//router
app.use("/api/v1", testRouter)
app.use("/api/v1/user", userRouter)
app.use("/",(req, res, next)=>{
    return res.status(200).send("Xin chào đại ca Haofng YTtan")
})

//port
const PORT = process.env.PORT || 3000

//listen
app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
