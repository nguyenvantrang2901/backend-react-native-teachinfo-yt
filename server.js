import express from "express"
import morgan from "morgan"
import cors from "cors"
import colors from "colors"
import dotevn from "dotenv"

const app = express()

//dotenv conffig
dotevn.config()

//middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

//router
app.get("/",(req, res, next)=>{
    return res.status(200).send("Xin chào đại ca Haofng YTtan")
})

//port
const PORT = process.env.PORT || 3000

//listen
app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
