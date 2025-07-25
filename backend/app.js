import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

// CORS Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // or your frontend URL
    credentials: true,
    optionsSuccessStatus: 200
  })
);

// Other Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes Import
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import aiRoutes from './routes/ai.route.js';

// Routes Declaration
app.use('/api/v1/users', userRoute);
app.use('/api/v1/messages', messageRoute);
app.use('/api/v1/ai', aiRoutes);

// 404 handler for unknown API routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
