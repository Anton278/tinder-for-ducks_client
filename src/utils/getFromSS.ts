// get from sessionStorage
export const getFromSS = <T>(key: string) => {
  const item = sessionStorage.getItem(key);
  const data: T | null = item ? JSON.parse(item) : null;
  return data;
};
