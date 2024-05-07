import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useLogin = () => {
  const nav = useNavigate();
  const url = "http://localhost:7777/api/auth/login";
  const { setAuthUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const login = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(url, data);
      const token = res.data.token;

      // Set token in cookies
      Cookies.set("jwt", token, { expires: 7 }); // Expires in 7 days
      // Set user data in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      setAuthUser(res.data);
      nav("/");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;