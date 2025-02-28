import { Server } from "socket.io";
import http from "http";
import express, { Application } from "express";
import { UserSocketMap } from "../types/user.types";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

//used to store online users
const userSocketMap: UserSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  //emit to broadcast events, which users are online
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
