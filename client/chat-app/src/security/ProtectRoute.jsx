import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../app/store.js";

const ProtectRoute = () => {
  const authUser = useStore().authUser;
  console.log(authUser, "protect");
  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
