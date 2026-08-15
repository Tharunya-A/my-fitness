import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../features/auth/api/auth.api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Auto-fetch profile if token exists on initial app load
  useEffect(() => {
    const fetchUserOnBoot = async () => {
      if (token) {
        try {
          const res = await authApi.getProfile();
          setUser(res.data?.user || res.user || res);
        } catch (err) {
          console.error('Session restore failed:', err);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUserOnBoot();
  }, [token]);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    const jwt = res.token || res.data?.token;
    const userData = res.user || res.data?.user;

    if (jwt) {
      localStorage.setItem('token', jwt);
      setToken(jwt);
    }
    if (userData) {
      setUser(userData);
    }
    return res;
  };

  const register = async (credentials) => {
    const res = await authApi.register(credentials);
    // Automatically log in after registration if token is returned
    const jwt = res.token || res.data?.token;
    const userData = res.user || res.data?.user;

    if (jwt) {
      localStorage.setItem('token', jwt);
      setToken(jwt);
      setUser(userData);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateProfileState = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        updateProfileState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};