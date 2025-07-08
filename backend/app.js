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
// app.use('/api/v1/donate/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(cookieParser());

// Routes Import
import userRoute from './routes/user.route.js';
// import blogRoute from './routes/blogs.route.js';
// // import commentRoute from './routes/comments.route.js';
// import reviewRoute from './routes/reviews.route.js';
// import aiRoutes from './routes/ai.routes.js';
// import donateRoute from './routes/donate.route.js';

// Routes Declaration
app.use('/api/v1/users', userRoute);
// app.use('/api/v1/blogs', blogRoute);
// app.use('/api/v1/blogs/:blogId/reviews', reviewRoute);
// app.use('/api/v1/ai', aiRoutes);
// app.use('/api/v1/donate', donateRoute);

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

export { app };
