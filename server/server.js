import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.routes.js";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import msgRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
dotenv.config();
const port = process.env.PORT || 777;
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-app-john.netlify.app/",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "GET,POST,PUT,DELETE", 
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/message", msgRouter);
app.use("/api/users", userRouter);

const db = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log("server is being listened on port", port);
    });
  } catch (error) {
    console.log(error.message);
  }
};

db();
