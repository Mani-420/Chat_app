import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173']
  }
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId] || null;
}

// Used for online user tracking
const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  }
  // Using this to send Events to all the connected clients

  io.emit('getAllOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete userSocketMap[userId];
    io.emit('userDisconnected', Object.keys(userSocketMap));
  });
});

export { io, app, server };
