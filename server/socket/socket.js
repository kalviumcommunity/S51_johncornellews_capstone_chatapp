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

const onlineUsers = {};
io.on("connection", (socket) => {
  console.log("user id: ", socket.id);
  const userID = socket.handshake.query.userID;
  if (userID) onlineUsers[userID] = socket.id;
  socket.emit("onlineUsers", Object.keys(onlineUsers));
  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete onlineUsers[socket.id];
    socket.emit("onlineUsers", Object.keys(onlineUsers));
  });
});

export { app, server, io };
