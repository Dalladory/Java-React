import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLoyout";
import CategoryPage from "./components/category/categoryPage";
import CreateCategoryPage from "./components/category/createCategory";
import UpdateCategoryPage from "./components/category/updateCategory";
import ProductsListPage from "./components/product/list";
import ProductPage from "./components/product/productPage";
import CreateProductPage from "./components/product/createProduct";
import UpdateProductPage from "./components/product/updateProduct";
import Loader from "./components/common/Loader/Loader";
import CategoriesListPage from "./components/category/list";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Login from "./account/login";
import Register from "./account/register";
import { useActions } from "./hooks/useActions";
import LogOutUser from "./account/logOut";

export const App: React.FC = () => {
  const { isAuthorized } = useTypedSelector((store) => store.userReducer);
  return (
    <>
      <Loader />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<CategoriesListPage />} />
          <Route path="category">
            <Route index element={<CategoryPage />} />
            <Route path="create" element={<CreateCategoryPage />} />
            <Route path="update" element={<UpdateCategoryPage />} />
          </Route>
          <Route path="product">
            <Route index element={<ProductsListPage />} />
            <Route path="details" element={<ProductPage />} />
            <Route path="create" element={<CreateProductPage />} />
            <Route path="update" element={<UpdateProductPage />} />
          </Route>
          {!isAuthorized && (
            <Route path="account">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          )}
          {isAuthorized && (
            <Route path="account">
              <Route path="logout" element={<LogOutUser />} />
            </Route>
          )}
        </Route>
      </Routes>
    </>
  );
};

export default App;
