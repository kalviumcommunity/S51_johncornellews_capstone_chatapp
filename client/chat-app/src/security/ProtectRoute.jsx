import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const ProtectRoute = () => {
  const { authUser } = useContext(AuthContext);

  console.log(authUser, "protect")
  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
