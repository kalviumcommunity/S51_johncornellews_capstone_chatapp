import axios from "axios";
import React from "react";
import { useState } from "react";

const useLogout = () => {
  const url = "http://localhost:7777/api/auth/logout";
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    setLoading(true);
    try {
        console.log("I am workinf")
      const res = await axios.get(url);
      localStorage.removeItem("user")
      console.log("Logged out", res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
