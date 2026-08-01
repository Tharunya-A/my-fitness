// src/config/swagger.config.js
import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.config.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Fitness API',
      version: '1.0.0',
      description: 'Auth and other API endpoints',
    },
    servers: [
      { url: env.NODE_ENV === 'production' ? 'https://api.yourapp.com' : 'http://localhost:5000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    './src/modules/auth/routes/*.js',
    './src/modules/billing/routes/*.js',
    './src/modules/health/routes/*.js',
    './src/modules/workout/routes/*.js',
  ],
};

export const swaggerSpec = swaggerJsdoc(options);