import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
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

app.use(express.json());

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:5173",
  "https://s51-johncornellews-capstone-chatapp.onrender.com",
  "https://chat-app-john.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the origin is in the allowed origins list
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,POST,PATCH,DELETE",
  })
);


// Serve static files
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

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
