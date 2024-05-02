import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";

const useSignUp = () => {
  const url = "http://localhost:7777/api/auth/signup";
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;
