const TOKEN_KEY = 'slam_auth_token';
const USER_KEY = 'slam_user_data';

export const storage = {
  // --- Auth Token ---
  getToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken: (token) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error('Error saving auth token to localStorage', e);
    }
  },
  removeToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error('Error removing auth token from localStorage', e);
    }
  },

  // --- User Object ---
  getUser: () => {
    try {
      const item = localStorage.getItem(USER_KEY);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user data to localStorage', e);
    }
  },
  removeUser: () => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Error removing user data from localStorage', e);
    }
  },

  // --- Generic Helpers ---
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving key "${key}" to localStorage`, e);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing key "${key}" from localStorage`, e);
    }
  },
  clearAll: () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  },
};