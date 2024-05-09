import React, { useEffect, useState } from "react";
import Message from "./Message";
import axios from "axios";
import { useStore } from "../../app/store";

const Messages = () => {
  const selectedConversation = useStore((state) => state.selectedConversation);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const get_messages = async () => {
      if (selectedConversation === null) return;
      const res = await axios.get(
        `http://localhost:7777/api/message/get/${selectedConversation}`,
        { withCredentials: true }
      );
      setMessages(res.data.messages);
      console.log(res);
    };
    get_messages();
  }, [selectedConversation]);
  return (
    <div style={{ height: "300px" }} className="px-4 overflow-y-auto">
      {messages &&
        messages.map((message) => (
          <Message message={message} key={message._id} />
        ))}
    </div>
  );
};

export default Messages;
