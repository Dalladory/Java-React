import { CategoryActions, CategoryActionTypes, CategoryState } from "../types";

const initialState: CategoryState = {
  selectedCategory: null,
  list: [],
};

export const categoryReducer = (
  state: CategoryState = initialState,
  action: CategoryActions
): CategoryState => {
  switch (action.type) {
    case CategoryActionTypes.SET_CATEGORIES_LIST:
      return {
        ...state,
        list: action.payload,
      };
    case CategoryActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return { ...state };
  }
};
