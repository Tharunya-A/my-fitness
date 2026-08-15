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
    const customError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Something went wrong. Please try again.',
      data: error.response?.data || null,
    };

    // If 401 Unauthorized occurs, handle token cleanup
    if (customError.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    return Promise.reject(customError);
  }
);

export default apiClient;