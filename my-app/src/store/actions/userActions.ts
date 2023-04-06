import { Dispatch } from "react";
import requests, {
  REQUESTS_URLS_PATHS,
  setJwtToHeaderFromLC,
} from "../../services/apiService";
import {
  deleteJwtToken,
  getJwtToken,
  setJwtToken,
} from "../../services/jwtService";
import {
  IGoogleLoginUser,
  ILoginUserResponse,
  IUser,
  UserActions,
  UserActionTypes,
} from "../types/userTypes";
import jwtDecode from "jwt-decode";

export const AuthUserFromLC = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    const jwtToken = getJwtToken();
    if (!jwtToken) return;
    setJwtToHeaderFromLC();
    const user = jwtDecode(jwtToken) as IUser;
    dispatch({ type: UserActionTypes.AUTH_USER, payload: user });
  } catch (err) {}
};

export const AuthUserGoogle =
  (values: IGoogleLoginUser) => async (dispatch: Dispatch<UserActions>) => {
    try {
      requests
        .post<ILoginUserResponse>(REQUESTS_URLS_PATHS.LOGIN_USER_GOOGLE, values)
        .then(({ data }) => {
          console.log(data);
          setJwtToken(data.token);
          setJwtToHeaderFromLC();
          const user = jwtDecode(data.token) as IUser;
          dispatch({ type: UserActionTypes.AUTH_USER, payload: user });
        });
    } catch (err) {}
  };

export const LogOutUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    deleteJwtToken();
    dispatch({ type: UserActionTypes.LOG_OUT_USER });
  } catch (err) {}
};
