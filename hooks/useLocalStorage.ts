/**
 * @file hooks/useLocalStorage.ts
 * @purpose A custom React hook for persisting state to the browser's localStorage.
 */
import { useState, useEffect } from 'react';

// A custom hook that uses localStorage for state persistence.
export const useLocalStorage = <T,>(key: string, defaultValue: T, validator?: (data: T) => boolean): [T, React.Dispatch<React.SetStateAction<T>>] => {
  
  const getInitialState = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return defaultValue;

      // JSON.parse with a reviver to correctly handle Date objects
      const parsedItem = JSON.parse(item, (k, v) => {
          if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v)) {
              return new Date(v);
          }
          return v;
      });

      // If a validator function is provided, use it to check if the stored data is valid.
      if (validator && !validator(parsedItem)) {
          return defaultValue;
      }
      
      return parsedItem;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return defaultValue;
    }
  };

  const [value, setValue] = useState<T>(getInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, value]);

  return [value, setValue];
};