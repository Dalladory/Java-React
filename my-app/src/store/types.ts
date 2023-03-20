export interface IServerResponse {
  success: boolean;
  payload: any;
  message: any;
}

export interface ICategory {
  id: number;
  name: string;
  image: string | undefined;
  description: string | undefined;
}

export interface CategoryState {
  list: Array<ICategory>;
  selectedCategory: ICategory | null;
}

export enum CategoryActionTypes {
  SET_CATEGORIES_LIST = "SET_CATEGORIES_LIST",
  SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY",
}

export interface SetCategoriesListAction {
  type: CategoryActionTypes.SET_CATEGORIES_LIST;
  payload: Array<ICategory>;
}

export interface SetSelectedCategoryAction {
  type: CategoryActionTypes.SET_SELECTED_CATEGORY;
  payload: ICategory | null;
}

export type CategoryActions =
  | SetCategoriesListAction
  | SetSelectedCategoryAction;
