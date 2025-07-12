import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app, io, server } from './socket/socketHandler.js';

dotenv.config({ path: './.env' });

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });
