import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = storage.get(key);
    return item !== null ? item : initialValue;
  });

  useEffect(() => {
    storage.set(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};