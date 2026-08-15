import axios from 'axios';
import { env } from './env.config.js';

/**
 * Custom Axios Instance for Backend API
 */
const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Request Interceptor: Attach JWT Bearer Token if present
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor: Global Error Handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error message extracted from Express AppError
    const data = error.response?.data;
    const status = error.response?.status || 500;
    // Check if backend returned structured validation errors
    if (data?.errors && Array.isArray(data.errors)) {
      // Extract array of specific messages: ["Password must be at least 8 characters", ...]
      error.messages = data.errors.map((e) => e.message);
    } else if (data?.message) {
      error.messages = [data.message];
    } else {
      error.messages = ['An unexpected error occurred. Please try again.'];
    }

    // If 401 Unauthorized occurs, handle token cleanup
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  }
);

export default apiClient;