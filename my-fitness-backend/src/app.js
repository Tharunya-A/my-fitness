import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { notFoundHandler, globalErrorHandler } from './shared/middlewares/error.middleware.js';
import { registerAuthModule } from './modules/auth/auth.facade.js';
import { registerHealthModule } from './modules/health/health.facade.js';
import { registerWorkoutModule } from './modules/workout/workout.facade.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config.js';
import { env } from './config/env.config.js';

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, try again later',
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many auth attempts, try again later',
  },
});

app.use('/api-docs', apiLimiter);
app.use('/auth/login', authLimiter);
app.use('/auth/register', authLimiter);

// Core Middlewares
app.use(helmet({
    crossOriginResourcePolicy: false,
  })
);                          // Sets secure HTTP headers
app.use(compression());                     // Gzip responses
app.use(cors({ 
  origin: env.NODE_ENV === 'production' 
  ? process.env.CORS_ORIGIN 
  : '*',
  credentials: true, 
})); // Restrict CORS in production
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Rate limit
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const checkPostgres = async () => {
  try {
    await pgPool.query('SELECT 1');
    return true;
  } catch (error) {
    return false;
  }
};

const checkMongo = async () => {
  try {
    return mongoose.connection.readyState === 1;
  } catch (error) {
    return false;
  }
};

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/health/live', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'my-fitness-backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health/ready', async (req, res) => {
  const postgresUp = await checkPostgres();
  const mongoUp = checkMongo();

  const isReady = postgresUp && mongoUp;

  res.status(isReady ? 200 : 503).json({
    status: isReady ? 'UP' : 'DOWN',
    checks: {
      postgres: postgresUp,
      mongo: mongoUp,
    },
    timestamp: new Date().toISOString(),
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Module Registration
registerAuthModule(app);
registerHealthModule(app);
registerWorkoutModule(app);
// Unhandled Route & Global Error Handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;