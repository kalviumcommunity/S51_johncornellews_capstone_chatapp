import { useState } from "react";
import axios from "axios";
import { useStore } from "../app/store.js";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useStore((state) => state.selectedConversation);

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:7777/api/message/get/${selectedConversation}`,
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
