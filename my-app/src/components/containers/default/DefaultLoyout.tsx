import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
  return (
    <>
      <DefaultHeader />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
