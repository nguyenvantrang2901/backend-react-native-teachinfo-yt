import mongoose from "mongoose"
import bcrypt from "bcryptjs"

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


//hash password
//chuyển đổi mật khẩu 
userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10)
})

//compare password
//convert mật khẩu để so sánh: dùng cho đăng nhập
userSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword, this.password)
}

export const userModel = mongoose.model("Users", userSchema)
export default userModel
