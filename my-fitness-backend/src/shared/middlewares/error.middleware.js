import { logger } from '../logger/logger.js';

// Catch 404 Route Not Found
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Centralized Error Handler
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};