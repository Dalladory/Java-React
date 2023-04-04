import { deleteJwtFromHeader, setJwtToHeaderFromLC } from "./apiService";

export const setJwtToken = (token: string) => {
  localStorage.token = token;
  setJwtToHeaderFromLC();
};

export const getJwtToken = (): string => {
  return localStorage.token as string;
};

export const deleteJwtToken = () => {
  localStorage.removeItem("token");
  deleteJwtFromHeader();
};
