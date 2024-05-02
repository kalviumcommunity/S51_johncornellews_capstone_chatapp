import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";

const useLogin = () => {
  const url = "http://localhost:7777/api/auth/login";
  const { setAuthUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const login = async (data) => {
    setLoading(true);
    try {
      // console.log(data)
      const res = await axios.post(url, data);
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
