// Importing necessary modules from their respective packages
import { Server } from "socket.io"; // Importing the Server class from the socket.io package
import express from "express"; // Importing the default export from the express package
import http from "http"; // Importing the http module from Node.js

// Creating an instance of an Express application
const app = express();

// Creating an HTTP server using the Express app instance
const server = http.createServer(app);

// Creating a new instance of Socket.IO server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-app-john.netlify.app"], // Allowing only these origins to connect
    methods: ["GET", "POST", "DELETE", "PATCH"], // Allowing only GET and POST methods for CORS
  },
});

// An object to keep track of online users by their IDs and associated socket IDs
const onlineUsers = {};

// Exporting a function to get the socket ID of a receiver by their user ID
export const getreceiverSocketID = (recieverID) => {
  return onlineUsers[recieverID]; // Returning the socket ID associated with the given receiver ID
};

// Setting up an event listener for new socket connections
io.on("connection", (socket) => {
  console.log("user id: ", socket.id); // Logging the connected user's socket ID
  const userID = socket.handshake.query.userID; // Extracting the userID from the query parameters of the handshake
  if (userID) {
    onlineUsers[userID] = socket.id; // Storing the mapping of userID to socket ID
    io.emit("onlineUsers", Object.keys(onlineUsers)); // Emitting an event to update the list of online users to all clients
  }
  // Setting up an event listener for socket disconnections
  socket.on("disconnect", () => {
    console.log("user disconnected"); // Logging the disconnection
    delete onlineUsers[userID]; // Removing the user from the online users list
    io.emit("onlineUsers", Object.keys(onlineUsers)); // Emitting an event to update the list of online users to all clients
  });
});

// Exporting the app, server, io instance, and onlineUsers object for use in other modules
export { app, server, io, onlineUsers };
