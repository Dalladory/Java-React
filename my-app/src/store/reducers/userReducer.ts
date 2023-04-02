import { stat } from "fs";
import { UserActions, UserActionTypes, UserState } from "../types/userTypes";

const initialState: UserState = {
  isAuthorized: false,
  user: undefined,
};

export const userReducer = (
  state: UserState = initialState,
  payload: UserActions
): UserState => {
  switch (payload.type) {
    case UserActionTypes.AUTH_USER:
      return { ...state, isAuthorized: true, user: payload.payload };
    default:
      return { ...state };
  }
};
