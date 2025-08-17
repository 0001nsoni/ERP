import mongoose from "mongoose";
import { DB_NAME } from "../constent.js";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async()=>{
    try{
        const connectionInstance= await mongoose.connect(`${process.env.MONGOOSE_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance}`)
    }
    catch(error)
    {
        console.log("Mongoose connection error",error);
        process.exit(1);
    }
}
export default connectDB;