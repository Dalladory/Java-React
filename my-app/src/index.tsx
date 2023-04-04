import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import "react-toastify/dist/ReactToastify.css";
import { setJwtToHeaderFromLC } from "./services/apiService";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { getJwtToken } from "./services/jwtService";
import { IUser, UserActionTypes } from "./store/types/userTypes";
import { AuthUserFromLC } from "./store/actions/userActions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const token = getJwtToken();
if (token) {
  AuthUserFromLC()(store.dispatch);
}

//store.dispatch({ type: CategoryActionTypes.SET_LIST, payload: [] });
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
