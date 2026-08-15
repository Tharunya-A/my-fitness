export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error saving ${key} to storage:`, err);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing ${key} from storage:`, err);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Error clearing storage:', err);
    }
  },
};