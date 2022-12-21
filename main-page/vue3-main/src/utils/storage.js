import { STORAGE_BASE } from "./constants";

export const setSessionStorage = (name, value) => {
  sessionStorage.setItem(`${STORAGE_BASE}-${name}`, value);
};

export const getSessionStorage = (name) => {
  return sessionStorage.getItem(`${STORAGE_BASE}-${name}`);
};

export const removeSessionStorage = (name) => {
  sessionStorage.removeItem(`${STORAGE_BASE}-${name}`);
};

export const setLocalStorage = (name, value) => {
  localStorage.setItem(`${STORAGE_BASE}-${name}`, value);
};
export const getLocalStorage = (name) => {
  return localStorage.getItem(`${STORAGE_BASE}-${name}`);
};
export const removeLocalStorage = (name) => {
  localStorage.removeItem(`${STORAGE_BASE}-${name}`);
};
