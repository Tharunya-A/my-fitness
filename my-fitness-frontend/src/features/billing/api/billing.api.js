import apiClient from '../../../config/api.config.js';

export const billingApi = {
  // POST /billing/create-order
  createOrder: async (planId) => {
    const response = await apiClient.post('/billing/create-order', { planId });
    return response.data;
  },

  // POST /billing/verify
  verifyPayment: async (paymentPayload) => {
    const response = await apiClient.post('/billing/verify', paymentPayload);
    return response.data;
  },
};