import axios from "axios";
import { useFormik, FormikProvider, Form, Field } from "formik";
import { ChangeEvent, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CategoryActionTypes,
  ICategory,
  IServerResponse,
} from "../../../store/types";
import { CreateProductSchema } from "../../../validation/schemas";
import { toast } from "react-toastify";
import { ICreateProduct } from "../../../store/productTypes";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { store } from "../../../store";
import { FaTrash } from "react-icons/fa";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { list } = useTypedSelector((store) => store.categoryReducer);

  useEffect(() => {
    if (list != null) {
      axios
        .get<IServerResponse>("http://localhost:8082/api/category/getall")
        .then((resp) => {
          const { payload } = resp.data;
          store.dispatch({
            type: CategoryActionTypes.SET_LIST,
            payload: payload,
          });
        });
    }
  }, []);

  const onSubmitHandler = (values: ICreateProduct) => {
    console.log(values);

    axios
      .post<IServerResponse>(
        "http://localhost:8082/api/product/create",
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(({ data }) => {
        if (data.success) {
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
  };

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files;
      let newImages = Object.assign([], values.productImages);
      for (let i = 0; i < files.length; i++) {
        newImages.push(files[i]);
      }
      setFieldValue("productImages", newImages);
      console.log(newImages.length);
    }
    //e.target.value = "";
  };
  const DeleteImageHandler = (imageName: string) => {
    setFieldValue(
      "productImages",
      values.productImages.filter((i) => i.name != imageName)
    );
  };

  const initialValues: ICreateProduct = {
    category_id: 0,
    name: "",
    price: 0,
    description: "",
    productImages: [],
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitHandler,
    validationSchema: CreateProductSchema,
    enableReinitialize: true,
    validateOnChange: true,
  });

  const { errors, touched, handleChange, handleSubmit, setFieldValue, values } =
    formik;

  return (
    <>
      <div className="mx-auto max-w-2xl">
        <div className="md:grid">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Name"
                            onChange={handleChange}
                            value={values.name}
                          />
                        </div>
                        {errors.name && touched.name ? (
                          <div style={{ color: "red" }}>{errors.name}</div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                          placeholder="Some description"
                          onChange={handleChange}
                          value={values.description}
                        />
                      </div>
                      {errors.description && touched.description ? (
                        <div style={{ color: "red" }}>{errors.description}</div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <div className="mt-1">
                        <Field
                          id="price"
                          name="price"
                          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0.00"
                          onChange={handleChange}
                          value={values.price}
                        />
                      </div>
                      {errors.price && touched.price ? (
                        <div style={{ color: "red" }}>{errors.price}</div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        onChange={handleChange}
                        id="category_id"
                        name="category_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected></option>
                        {list.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        <label
                          //htmlFor="image"
                          className="inline-block w-40 overflow-hidden bg-gray-100"
                        >
                          {values.productImages.length == 0 ? (
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          ) : (
                            values.productImages.map(
                              (image: File, index: any) => (
                                <>
                                  <div
                                    id={index}
                                    style={{ cursor: "pointer" }}
                                    className="flex justify-center ... border-2 border-black  rounded-lg ... "
                                    onClick={() => {
                                      DeleteImageHandler(image.name);
                                    }}
                                  >
                                    <FaTrash className="m-2 " />
                                  </div>
                                  <div className="p-2">
                                    <img src={URL.createObjectURL(image)} />
                                  </div>
                                </>
                              )
                            )
                          )}
                        </label>
                        <label
                          htmlFor="image"
                          className="ml-5 rounded-md border border-gray-300 bg-white 
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                        focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Обрати фото
                        </label>
                        <input
                          type="file"
                          id="image"
                          className="hidden"
                          onChange={changeImageHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProductPage;
