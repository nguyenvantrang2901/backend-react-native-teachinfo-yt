import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true,"Email already taken"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password Length must be greater tehn 6 character"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    phone: {
        type: String,
        required: [true, "Telephone number is required"]
    },
    image: {
        type: String
    },
},{timestamps: true})

export const userModel = mongoose.model("Users", userSchema)
export default userModel
