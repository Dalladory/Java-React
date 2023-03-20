import axios from "axios";
import { APP_ENV } from "../env";
import { store } from "../store";
import { IsLoadingActionsTypes } from "../store/reducers/isLoadingReducer";

const instance = axios.create({
  baseURL: APP_ENV.REMOTE_HOST_NAME,
});

instance.interceptors.request.use((config: any) => {
  store.dispatch({ type: IsLoadingActionsTypes.SET_LOADING, payload: true });
  return config;
});

instance.interceptors.response.use((response: any) => {
  store.dispatch({ type: IsLoadingActionsTypes.SET_LOADING, payload: false });
  return response;
});

//const responseBody: any = (response: any): any => response.data;
export enum HttpContentTypes {
  MULTIPART_FORM_DATA = "multipart/form-data",
  APPLICATION_JSON = "application/json",
}

const requests = {
  get: async <ResponseType>(url: string) => instance.get<ResponseType>(url),
  post: async <ResponseType>(
    url: string,
    data: any,
    contentType: HttpContentTypes = HttpContentTypes.APPLICATION_JSON
  ) =>
    instance.post<ResponseType>(url, data, {
      headers: { "Content-Type": contentType },
    }),
  delete: async <ResponseType>(url: string) =>
    instance.delete<ResponseType>(url),
};

export default requests;
