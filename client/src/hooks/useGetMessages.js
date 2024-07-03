import { useState } from "react";
import axios from "axios";
import { useStore } from "../app/store.js";
import Cookies from "js-cookie"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useStore((state) => state.selectedConversation);
  const jwt = Cookies.get("jwt")
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://s51-johncornellews-capstone-chatapp.onrender.com/api/message/get/${selectedConversation}`,
        { jwt },
        { withCredentials: true, headers: headers }
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
