import { setJwtToHeaderFromLC } from "./apiService";

export const setJwtToken = (token: string) => {
  localStorage.token = token;
  setJwtToHeaderFromLC();
};

export const getJwtToken = (): string => {
  return localStorage.token as string;
};
