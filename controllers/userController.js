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
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            data: user
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