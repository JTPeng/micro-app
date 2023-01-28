import { STORAGE_BASE } from "./constants";

export const setSessionStorage = (name: string, value: string) => {
  sessionStorage.setItem(`${STORAGE_BASE}-${name}`, value);
};

export const getSessionStorage = (name: string) => {
  return sessionStorage.getItem(`${STORAGE_BASE}-${name}`);
};

export const removeSessionStorage = (name: string) => {
  sessionStorage.removeItem(`${STORAGE_BASE}-${name}`);
};

export const setLocalStorage = (name: string, value: string) => {
  localStorage.setItem(`${STORAGE_BASE}-${name}`, value);
};
export const getLocalStorage = (name: string) => {
  return localStorage.getItem(`${STORAGE_BASE}-${name}`);
};
export const removeLocalStorage = (name: string) => {
  localStorage.removeItem(`${STORAGE_BASE}-${name}`);
};
