import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import loginImg from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, FormikProvider, useFormik } from "formik";
import {
  ILoginUser,
  ILoginUserResponse,
  IRegisterUser,
  IUser,
  UserActionTypes,
} from "../../store/types/userTypes";
import requests, { REQUESTS_URLS_PATHS } from "../../services/apiService";
import { setJwtToken } from "../../services/jwtService";
import { store } from "../../store";

const LoginPage = () => {
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const OnSubmitHandler = async (values: ILoginUser) => {
    if (!executeRecaptcha) return;
    const reCaptchaToken = await executeRecaptcha();
    values.reCaptchaToken = reCaptchaToken;
    //setFieldValue("reCaptchaToken", reCaptchaToken);
    console.log(values);
    requests
      .post<ILoginUserResponse>(REQUESTS_URLS_PATHS.LOGIN_USER, values)
      .then(({ data }) => {
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
  const initialValues: ILoginUser = {
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
              <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white">
                Sign In
              </button>
              <Link to="../register" className="relative">
                <p className="text-center mt-8">Create account</p>
              </Link>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
