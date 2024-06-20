// utils/localStorage.ts

export const setItem = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }
  return null;
};

export const removeItem = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const appendItem = <T>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    const existingItems = getItem<T[]>(key) || [];
    existingItems.push(value);
    setItem(key, existingItems);
  }
};
