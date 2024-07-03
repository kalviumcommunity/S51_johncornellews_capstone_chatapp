import axios from "axios";
import { useState } from "react";
import { useStore } from "../app/store";
import Cookies from "js-cookie";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useStore((state) => state.selectedConversation);
    const jwt = Cookies.get("jwt");
  const sendMessage = async (message) => {
    setLoading(true); 
    try {
      const res = await axios.post(
        `https://s51-johncornellews-capstone-chatapp.onrender.com/api/message/send/${selectedConversation}`,
        { message, jwt },
        { headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } }
      );
      console.log("working");
      console.log(res);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
