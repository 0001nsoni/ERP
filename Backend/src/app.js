import express,{urlencoded} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "../routes/auth.routes.js";
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth",authRoute)
export {app};