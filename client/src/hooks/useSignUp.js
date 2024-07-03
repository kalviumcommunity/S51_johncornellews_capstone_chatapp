import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useStore } from "../app/store.js";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const url =
    "https://s51-johncornellews-capstone-chatapp.onrender.com/api/auth/signup";
  const [loading, setLoading] = useState(false);
  const setAuthUser = useStore().setAuthUser;
  const nav = useNavigate()
  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"

        }
      });
      const token = res.data.token;

      // Set token in cookies
      Cookies.set("jwt", token, { expires: 7 }); // Expires in 7 days
      // Set user data in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      setAuthUser(res.data);
      nav("/")
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;
