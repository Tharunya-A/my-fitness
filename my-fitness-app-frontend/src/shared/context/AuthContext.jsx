import React, { createContext, useState } from 'react';
import { axiosClient } from '../api/axiosClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { storage } from '../utils/storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.get('user_data') || null);
  const [token, setToken] = useState(() => storage.get('auth_token') || null);
  const [loading, setLoading] = useState(false);

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      const { token: newToken, user: newUser } = response.data.data;

      setToken(newToken);
      setUser(newUser);
      storage.set('auth_token', newToken);
      storage.set('user_data', newUser);

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      const { token: newToken, user: newUser } = response.data.data;

      setToken(newToken);
      setUser(newUser);
      storage.set('auth_token', newToken);
      storage.set('user_data', newUser);

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    storage.remove('auth_token');
    storage.remove('user_data');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};