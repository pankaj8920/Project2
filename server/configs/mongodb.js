import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const connectDB = async () => {
    mongoose.connection.on('connected',()=>console.log('database connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/study`)
}
export default connectDB;
