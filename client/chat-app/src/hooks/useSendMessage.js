import axios from "axios";
import { useState } from "react";
import { useStore } from "../app/store";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useStore((state) => state.selectedConversation);

  const sendMessage = async (message) => {
    setLoading(true); 
    try {
      const res = await axios.post(
        `http://localhost:7777/api/message/send/${selectedConversation}`,
        { message }, 
        { withCredentials: true }
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
