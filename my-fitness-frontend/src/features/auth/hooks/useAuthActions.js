import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { loginUser, registerUser, getProfile } from '../api/auth.api.js';

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login: setAuthUser, logout: clearAuthUser } = useAuth();
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      // Update Context state (stores user & token)
      if (setAuthUser) {
        setAuthUser(response.user || response.data?.user, response.token || response.data?.token);
      }
      navigate('/dashboard');
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Registration
  const handleRegister = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerUser(userData);
      // Auto-login after registration if token is returned
      if (response.token || response.data?.token) {
        if (setAuthUser) {
          setAuthUser(response.user || response.data?.user, response.token || response.data?.token);
        }
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please check details.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    if (clearAuthUser) {
      clearAuthUser();
    }
    navigate('/login');
  };

  // Fetch / Refresh Profile
  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProfile();
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch user profile.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    fetchProfile,
    isLoading,
    error,
    setError,
  };
};