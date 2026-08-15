import apiClient from '../../../config/api.config.js';

export const authApi = {
  // POST /auth/register
  register: async (credentials) => {
    const response = await apiClient.post('/auth/register', credentials);
    return response.data;
  },

  // POST /auth/login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // GET /auth/me
  getProfile: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // PUT /auth/profile
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/auth/profile', { profile: profileData });
    return response.data;
  },
};