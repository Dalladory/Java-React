import { CategoryActions, CategoryActionTypes, CategoryState } from "../types";

const initialState: CategoryState = {
  selectedCategory: null,
  list: [],
};

export const categoryReducer = (
  state = initialState,
  action: CategoryActions
): CategoryState => {
  switch (action.type) {
    case CategoryActionTypes.SET_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case CategoryActionTypes.SET_SELECTED:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return { ...state };
  }
};
