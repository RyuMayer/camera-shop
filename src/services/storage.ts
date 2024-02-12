export const getStorage = <T>(key: string): T | undefined => {
  const state = localStorage.getItem(key);

  if (!state) return undefined;

  return JSON.parse(state) as T;
};

export const saveStorage = <T>(state: T, key: string) => {
  localStorage.setItem(key, JSON.stringify(state));
};
