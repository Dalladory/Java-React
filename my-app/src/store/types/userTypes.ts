import { Interface } from "readline";

export interface IRegisterUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  token: string;
}
export interface IRegisterUserResponse {
  token: string;
}

export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface UserState {
  isAuthorized: boolean;
  user: IUser | undefined;
}

export enum UserActionTypes {
  AUTH_USER = "AUTH_USER",
}

export interface AuthUserAction {
  type: UserActionTypes.AUTH_USER;
  payload: IUser;
}

export type UserActions = AuthUserAction;
