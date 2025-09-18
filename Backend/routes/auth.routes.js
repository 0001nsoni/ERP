import express from "express";
import { loginAdmin, loginDriver, loginFaculty, loginStudent, registerAdmin, registerDriver, registerFaculty, registerStudent } from "../controllers/auth.controller.js";
const authRoute = express.Router();

//student auth
authRoute.post("/student/register",registerStudent);
authRoute.post("/student/login",loginStudent);

//faculty auth
authRoute.post("/faculty/register",registerFaculty);
authRoute.post("/faculty/login",loginFaculty);


//driver auth
authRoute.post("/driver/register",registerDriver);
authRoute.post("/driver/login",loginDriver);

//admin auth
authRoute.post("/admin/register",registerAdmin);
authRoute.post("/admin/login",loginAdmin);



export default authRoute;