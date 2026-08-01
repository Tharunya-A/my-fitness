import billingRoutes from './routes/billing.routes.js';

export const registerBillingModule = (app) => {
  app.use('/billing', billingRoutes);
};
