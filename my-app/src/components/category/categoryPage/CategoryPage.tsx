import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CategoryActionTypes, IServerResponse } from "../../../store/types";
import { store } from "../../../store";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { toast } from "react-toastify";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const CategoryPage = () => {
  const navigate = useNavigate();
  const { selectedCategory } = useTypedSelector(
    (store) => store.categoryReducer
  );
  const [searchParams, setSearchParams] = useSearchParams({});
  const categoryId = searchParams.get("id");

  useEffect(() => {
    axios
      .get<IServerResponse>(`http://localhost:8082/api/category/${categoryId}`)
      .then((resp) => {
        const payload = resp.data;
        store.dispatch({
          type: CategoryActionTypes.SET_SELECTED,
          payload: payload.payload,
        });
      });
  }, []);

  const deleteHandler = () => {
    const id = searchParams.get("id");
    axios
      .delete(`http://localhost:8082/api/category/${id}`)
      .then(({ data }) => {
        if (data.success) {
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl">
          <div className="aspect-w-3 aspect-h-4 rounded-lg lg:block">
            <img
              src={
                "http://localhost:8082/api/image/1200_" +
                selectedCategory?.image
              }
              alt={selectedCategory?.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {selectedCategory?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {selectedCategory?.name}
            </p>
            <div className="grid-cols-2">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={deleteHandler}
              >
                Delete
              </button>
              <Link to={"update/?id=" + categoryId}>
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </Link>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {selectedCategory?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
