import axios from "axios";
import React, { useState } from "react";

const useLogin = () => {
  const url = "http://localhost:7777/api/auth/login";
  const [loading, setLoading] = useState(false);
  const login = async (data) => {
    setLoading(true);
    try {
      // console.log(data)
      const res = await axios.post(url, data);
      console.log(res)
      // localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
