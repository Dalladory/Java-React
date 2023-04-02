import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { IsLoadingReducer } from "./isLoadingReducer";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  productReducer,
  categoryReducer,
  IsLoadingReducer,
  userReducer,
});
