import {userModel} from "../models/userModel.js"

//register
export const userController = async(req, res) => {
    try {
        const {name, email, password, city, phone, address} = req.body
        if(!name || !email || !password || !city || !phone || !address){
            return res.status(500).send({
                success: false,
                message: "Invalid fields",
            })
        }
        //check email existing
        const emailExisting = await userModel.findOne({email})
        if(emailExisting){
            return res.status(500).send({
                success: false,
                message: 'Email already existed'
            })
        }
        
        const user = await userModel.create({
            name,
            email,
            password,
            city,
            phone,
            address
        })
        res.status(201).send({
            success: true,
            message: "Register user successfully!",
            data: user
        })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).send({
            success: false,
            message: "Error in Register Api",
            error
        })
    }
}

//login
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Invalid fields"
            })
        }

        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //check password
        const isMatchPassword = await user.comparePassword(password)
        if(!isMatchPassword){
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = user.generateToken()
        res.status(200)
        //cookie đc lưu trữ trong 7 ngày
        .cookie("token", token, {
            expires: new Date(Date.now() + 7*24*60*60*1000),
            secure: process.env.NODE_ENV === "development" ? true : false,
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
            sameSite: process.env.NODE_ENV === "development" ? true : false
        })
        .send({
            success: true,
            message: "Login Successfully",
            token: token,
            data: user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "API Login Error",
            error
        })
    }
}

//get user
export const getUserProfileController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        res.status(200).send({
            success: true,
            message: "User profile fetched successflly",
            data: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "API Get User Profile Error",
            error
        })
    }
}

//Logout
export const logoutController = async (req, res) =>{
    try {
        res.status(200)
        .cookie("token","",{
            expires: new Date(Date.now()),
            secure: process.env.NODE_ENV === "development" ? true : false,
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
            sameSite: process.env.NODE_ENV === "development" ? true : false
        })
        .send({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "API Logout Error",
            error
        })
    }
}
