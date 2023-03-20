import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { IsLoadingReducer } from "./isLoadingReducer";
import { productReducer } from "./productReducer";

export const rootReducer = combineReducers({
  productReducer,
  categoryReducer,
  IsLoadingReducer,
});
