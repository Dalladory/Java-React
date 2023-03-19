import axios from "axios";
import { useFormik, FormikProvider, Form, Field } from "formik";
import { ChangeEvent, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { store } from "../../../store";
import { FaTrash } from "react-icons/fa";
import {
  CategoryActionTypes,
  ICategory,
  IServerResponse,
} from "../../../store/types";
import { CreateCategorySchema } from "../../../validation/schemas";
import { IUpdateCategory } from "../types";

const UpdateCategoryPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearhParams] = useSearchParams({});
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
        setValues(payload.payload);
      });
  }, []);

  const onSubmitHandler = (values: IUpdateCategory) => {
    console.log(values);

    axios
      .post<IServerResponse>(
        "http://localhost:8082/api/category/update",
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
      var file = files[0];
      if (values.image != undefined) {
        setFieldValue("image", undefined);
      }
      setFieldValue("newImage", file);
    }
    //e.target.value = "";
  };

  const DeleteImageHandler = (e: any) => {
    e.preventDefault();
    setFieldValue("image", undefined);
  };

  const DeleteNewImageHandler = (e: any) => {
    e.preventDefault();
    setFieldValue("newImage", undefined);
  };

  const initialValues: IUpdateCategory = {
    id: 0,
    name: "",
    description: undefined,
    image: undefined,
    newImage: undefined,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmitHandler,
    validationSchema: CreateCategorySchema,
    enableReinitialize: true,
    validateOnChange: true,
  });

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    values,
  } = formik;

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
                      <label className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        <label
                          htmlFor="image"
                          className="inline-block w-40 overflow-hidden bg-gray-100"
                        >
                          {/* show empty image id don't have amy images */}
                          {values.image == undefined &&
                          values.newImage == undefined ? (
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          ) : null}
                          {/* show old image */}
                          {values.image != undefined ? (
                            <>
                              <div
                                style={{ cursor: "pointer" }}
                                className="flex justify-center ... border-2 border-black  rounded-lg ... "
                                onClick={DeleteImageHandler}
                              >
                                <FaTrash className="m-2 " />
                              </div>
                              <div className="p-2">
                                <img
                                  src={
                                    "http://localhost:8082/api/image/300_" +
                                    values.image
                                  }
                                />
                              </div>
                            </>
                          ) : null}
                          {/* show new image */}
                          {values.newImage != undefined ? (
                            <>
                              <div
                                style={{ cursor: "pointer" }}
                                className="flex justify-center ... border-2 border-black  rounded-lg ... "
                                onClick={DeleteNewImageHandler}
                              >
                                <FaTrash className="m-2 " />
                              </div>
                              <div className="p-2">
                                <img
                                  src={URL.createObjectURL(values.newImage)}
                                />
                              </div>
                            </>
                          ) : null}
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

export default UpdateCategoryPage;
