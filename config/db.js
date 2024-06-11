import mongoose from "mongoose";

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connect Mongodb Successfully : ${mongoose.connection.host}`)

    } catch (error) {
        console.log(`Mongodb Connect error: ${error}`)
    }
}

export default connectDb;
