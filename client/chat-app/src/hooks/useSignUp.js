import axios from "axios";
import { useState } from "react";

const useSignUp = () => {
  const url = "http://localhost:7777/api/auth/signup";
  const [loading, setLoading] = useState(false);
  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      localStorage.setItem(JSON.stringify(res.data), "user")
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;
