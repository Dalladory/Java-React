import LoginPage from "./loginPage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Login = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lf1OlIlAAAAADM628w6-JwxFS8tfQmcTWT_safZ">
      <LoginPage />
    </GoogleReCaptchaProvider>
  );
};

export default Login;
