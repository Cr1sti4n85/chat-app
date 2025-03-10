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

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

//used to store online users
const userSocketMap: UserSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  //emit to broadcast events, which users are online
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
