import React, { useContext, useEffect } from "react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/Authcontext";
import ProtectRoute from "./security/ProtectRoute";

const App = () => {
  const { authUser } = useContext(AuthContext);
  useEffect(() => {
    console.log(authUser);
  }, [authUser]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
