import RegisterPage from "./registerPage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Register = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lf1OlIlAAAAADM628w6-JwxFS8tfQmcTWT_safZ">
      <RegisterPage />
    </GoogleReCaptchaProvider>
  );
};

export default Register;
