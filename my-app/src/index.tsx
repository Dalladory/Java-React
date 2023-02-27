import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLoyout";
import Home from "./components/home";
import CategoryPage from "./components/category";
import { Provider } from "react-redux";
import { store } from "./store";
import { CategoryActionTypes } from "./store/types";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

store.dispatch({ type: CategoryActionTypes.SET_LIST, payload: [] });

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
