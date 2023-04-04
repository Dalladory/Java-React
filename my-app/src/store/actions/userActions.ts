import { Dispatch } from "react";
import { setJwtToHeaderFromLC } from "../../services/apiService";
import { deleteJwtToken, getJwtToken } from "../../services/jwtService";
import { IUser, UserActions, UserActionTypes } from "../types/userTypes";
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

export const LogOutUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    deleteJwtToken();
    dispatch({ type: UserActionTypes.LOG_OUT_USER });
  } catch (err) {}
};
