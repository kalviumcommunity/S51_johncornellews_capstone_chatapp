import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-john.netlify.app"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user id: ", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export { app, server, io };
