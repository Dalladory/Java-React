import {
  ProductActions,
  ProductActionTypes,
  ProductState,
} from "../productTypes";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

export const productReducer = (
  state: ProductState = initialState,
  action: ProductActions
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCTS_LIST:
      return { ...state, products: action.payload };
    case ProductActionTypes.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    default:
      return { ...state };
  }
};
