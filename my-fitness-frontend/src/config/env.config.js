/**
 * Application Environment Configuration
 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  razorpayKeyId: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
};