import { ICategory } from "./types";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  dateCreated: Date;
  category: ICategory;
  productImages: Array<IProductImage>;
}

export interface IProductImage {
  id: number;
  image: string;
  priority: number;
}

export interface ICreateProduct {
  category_id: number;
  name: string;
  price: number;
  description: string;
  productImages: Array<File>;
}

export interface ProductState {
  products: Array<IProduct>;
  selectedProduct: IProduct | null;
}

export enum ProductActionTypes {
  SET_PRODUCTS_LIST = "SET_PRODUCTS_LIST",
  SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT",
}

export interface SetProductListAction {
  type: ProductActionTypes.SET_PRODUCTS_LIST;
  payload: Array<IProduct>;
}

export interface SetSelectedProductAction {
  type: ProductActionTypes.SET_SELECTED_PRODUCT;
  payload: IProduct;
}

export type ProductActions = SetProductListAction | SetSelectedProductAction;
