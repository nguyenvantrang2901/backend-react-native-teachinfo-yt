import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const isAuth = async (req, res, next)=>{
    const {token} = req.cookies
    if(!token) {
        return res.status(401).send({
            success: false,
            message: "UnAutherized User"
        })
    }    
    const dataDecode = JWT.verify(token,process.env.JWT_SECRET)
    req.user = await userModel.findById(dataDecode._id)
    next()
}