import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../app/store.js";
import Cookies from "js-cookie";

const ProtectRoute = () => {
  const authUser = useStore().authUser;
  const jwt = Cookies.get("jwt");
  console.log(authUser, "protect");
  return authUser && jwt && jwt !== null && jwt !== undefined ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectRoute;
