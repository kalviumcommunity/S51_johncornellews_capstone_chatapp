import { useState } from "react";
import axios from "axios";
import { useStore } from "../app/store.js";
import Cookies from "js-cookie"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useStore((state) => state.selectedConversation);
  const jwt = Cookies.get("jwt")
  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://s51-johncornellews-capstone-chatapp.onrender.com/api/message/get/${selectedConversation}`,
        { jwt },
        { withCredentials: true }
      );
      console.log(res.data);
      return res.data.messages;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getMessages };
};

export default useGetMessages;
