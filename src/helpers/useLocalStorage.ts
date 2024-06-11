export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key: string) => {
    return window.localStorage.getItem(key);
  };
  return { setItem, getItem };
};

export function getExpiryDate(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
