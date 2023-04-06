import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

import loginImg from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, FormikProvider, useFormik } from "formik";
import requests, { REQUESTS_URLS_PATHS } from "../../services/apiService";
import {
  IRegisterUser,
  IRegisterUserResponse,
  IUser,
  UserActionTypes,
} from "../../store/types/userTypes";
import { setJwtToken } from "../../services/jwtService";
import { store } from "../../store";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const OnSubmitHandler = async (values: IRegisterUser) => {
    if (!executeRecaptcha) return;
    const reCaptchaToken = await executeRecaptcha();
    values.reCaptchaToken = reCaptchaToken;
    console.log(values);
    requests
      .post<IRegisterUserResponse>(REQUESTS_URLS_PATHS.REGISTER_USER, values)
      .then(({ data }) => {
        console.log(data);
        setJwtToken(data.token);
        const user: IUser = {
          id: 0,
          name: "",
          surname: "",
          email: "",
        };
        store.dispatch({ type: UserActionTypes.AUTH_USER, payload: user });
        navigate("/");
      });
  };
  const initialValues: IRegisterUser = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    reCaptchaToken: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: OnSubmitHandler,
    enableReinitialize: true,
  });
  const { errors, touched, handleChange, handleSubmit, setFieldValue, values } =
    formik;

  return (
    <>
      <div className="relative w-full h-screen bg-zinc-900/90">
        <img
          className="absolute w-full h-full object-cover mix-blend-overlay"
          src={loginImg}
          alt="/"
        />
        <div className="flex justify-center py-10 ">
          <FormikProvider value={formik}>
            <Form
              onSubmit={handleSubmit}
              className="max-w-[400px] w-full mx-auto bg-white p-8"
            >
              <h2 className="text-4xl font-bold text-center py-2">Log In</h2>
              <div className="flex justify-between py-8">
                <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                  <AiFillFacebook className="mr-2" /> Facebook
                </p>
                <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                  <FcGoogle className="mr-2" /> Google
                </p>
              </div>
              <div className="flex flex-col mb-4">
                <label>Name</label>
                <Field
                  className="border relative bg-gray-100 p-2"
                  type="text"
                  name="firstname"
                  values={values.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label>Surname</label>
                <Field
                  className="border relative bg-gray-100 p-2"
                  type="text"
                  name="lastname"
                  values={values.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label>Email</label>
                <Field
                  className="border relative bg-gray-100 p-2"
                  type="text"
                  name="email"
                  values={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col ">
                <label>Password</label>
                <Field
                  className="border relative bg-gray-100 p-2"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
              >
                Create account
              </button>
              <Link to="../login" className="relative">
                <p className="text-center mt-8">Sign In</p>
              </Link>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
