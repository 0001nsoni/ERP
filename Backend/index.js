import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./DB/index.js";
import { app } from "./src/app.js";
connectDB()
.then(
    ()=>{
        app.listen(process.env.PORT|| 8000,()=>{
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    }
)
.catch((err)=>{
    console.log("Mongo db connection failed!!!", err)
})