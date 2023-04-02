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
import { ProductActionTypes } from "../../../store/types/productTypes";
import requests from "../../../services/apiService";

function classNames(...classNamees: any) {
  return classNamees.filter(Boolean).join(" ");
}

const ProductPage = () => {
  const navigate = useNavigate();
  const { selectedProduct } = useTypedSelector((store) => store.productReducer);
  const productImages = selectedProduct?.productImages;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams({});
  const productId = searchParams.get("id");

  useEffect(() => {
    requests
      .get<IServerResponse>(`http://localhost:8082/api/product/${productId}`)
      .then((resp) => {
        const payload = resp.data;
        store.dispatch({
          type: ProductActionTypes.SET_SELECTED_PRODUCT,
          payload: payload.payload,
        });
      });
  }, []);

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8082/api/product/${productId}`)
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
          {/* <div className="aspect-w-3 aspect-h-4 rounded-lg lg:block">
            <img
              src={
                "http://localhost:8082/api/image/1200_" +
                selectedProduct?.productImages[0]?.image
              }
              alt={selectedProduct?.name}
              className="h-full w-full object-cover object-center"
            />
          </div> */}
          {selectedProduct && selectedProduct.productImages.length > 0 ? (
            <div
              id="default-carousel"
              className="relative w-full"
              data-carousel="slide"
            >
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {/* {selectedProduct?.productImages.map((image, index) => ( */}
                <div
                  id="carousel-item"
                  className="duration-700 ease-in-out"
                  data-carousel-item
                >
                  <img
                    src={
                      "http://localhost:8082/api/image/1200_" +
                      selectedProduct?.productImages[currentImageIndex].image
                    }
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt=""
                  />
                </div>
                {/* ))} */}
              </div>
              {/* <!-- Slider controls --> */}
              <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={() => {
                  if (currentImageIndex > 0) {
                    setCurrentImageIndex(currentImageIndex - 1);
                  } else {
                    if (productImages != undefined)
                      setCurrentImageIndex(productImages?.length - 1);
                  }
                }}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={() => {
                  if (
                    productImages?.length != undefined &&
                    currentImageIndex < productImages?.length - 1
                  ) {
                    setCurrentImageIndex(currentImageIndex + 1);
                  } else {
                    setCurrentImageIndex(0);
                  }
                }}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          ) : null}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {selectedProduct?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {selectedProduct?.price + " грн"}
            </p>
            <div className="grid-cols-2">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={deleteHandler}
              >
                Delete
              </button>
              <Link to={"../update/?id=" + productId}>
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
                  {selectedProduct?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
