import axios from "axios";
import { type } from "os";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import requests from "../../../services/apiService";
import { store } from "../../../store";
import {
  CategoryActionTypes,
  ICategory,
  IServerResponse,
} from "../../../store/types";

const CategoriesListPage = () => {
  const { list } = useTypedSelector((store) => store.categoryReducer);

  useEffect(() => {
    requests
      .get<IServerResponse>("http://localhost:8082/api/category/getall")
      .then((resp) => {
        const { payload } = resp.data;
        store.dispatch({
          type: CategoryActionTypes.SET_CATEGORIES_LIST,
          payload: payload,
        });
      });
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
            <div>
              <Link
                to="/category/create"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Create
              </Link>
            </div>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {list.map((category: ICategory) => (
                <>
                  <div key={category.id} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={
                          "http://localhost:8082/api/image/600_" +
                          category.image
                        }
                        alt={category.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <Link to={"/category/?id=" + category.id.toString()}>
                        <span className="absolute inset-0" />
                        {category.name}
                      </Link>
                    </h3>
                    <p className="text-base font-semibold text-gray-900">
                      {category.description}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesListPage;
