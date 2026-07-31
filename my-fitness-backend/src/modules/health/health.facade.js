import healthRoutes from './routes/health.routes.js';

export const registerHealthModule = (app) => {
  app.use('/health', healthRoutes);
};