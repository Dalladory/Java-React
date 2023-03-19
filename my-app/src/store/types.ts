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
  SET_LIST = "SET_LIST",
  SET_SELECTED = "SET_SELECTED",
}

export interface SetListAction {
  type: CategoryActionTypes.SET_LIST;
  payload: Array<ICategory>;
}

export interface SetSelectedAction {
  type: CategoryActionTypes.SET_SELECTED;
  payload: ICategory | null;
}

export type CategoryActions = SetListAction | SetSelectedAction;
