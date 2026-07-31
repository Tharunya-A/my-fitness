import authRoutes from './routes/auth.routes.js';

export const registerAuthModule = (app) => {
  app.use('/auth', authRoutes);
};
