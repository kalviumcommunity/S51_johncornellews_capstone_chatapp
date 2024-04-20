import express from "express"
const app = express();
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.routes.js";
import { connectDB } from "./db/connectDB.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import msgRouter from "./routes/message.routes.js";
dotenv.config()
const port = process.env.PORT || 777
app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/message", msgRouter)
const db = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log("server is being listened on port", port)
        })
    } catch (error) {
        console.log(error.message)
    }
}

db()

