import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { deleteJwtToken } from "../../services/jwtService";

export const LogOutUser = () => {
  const navigate = useNavigate();
  const { LogOutUser } = useActions();
  useEffect(() => {
    LogOutUser();
    navigate("/");
  }, []);

  return <p></p>;
};

export default LogOutUser;
