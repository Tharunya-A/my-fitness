import axios from 'axios';
import { storage } from '../utils/storage';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to attach the Bearer token automatically
axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.get('auth_token');
    
    if (token) {
      // Ensure 'Bearer ' prefix is present
      config.headers.Authorization = token.startsWith('Bearer ') 
        ? token 
        : `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Intercept 401 Unauthorized responses to auto-logout invalid tokens
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      storage.remove('auth_token');
      storage.remove('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);