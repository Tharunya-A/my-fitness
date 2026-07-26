import express from 'express';
import cors from 'cors';
import { notFoundHandler, globalErrorHandler } from './shared/middlewares/error.middleware.js';

const app = express();

// Core Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Unhandled Route & Global Error Handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;