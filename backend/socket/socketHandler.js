import { Server } from 'socket.io';
import http from 'http';
import app from '../app.js';

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
  console.log('User ID from handshake:', userId);
  if (userId && userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    console.log('Current online users:', Object.keys(userSocketMap));
  }
  // Using this to send Events to all the connected clients

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (userId) {
      delete userSocketMap[userId];
      console.log(
        'Updated online users after disconnect:',
        Object.keys(userSocketMap)
      );
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { io, app, server };
