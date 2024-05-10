import  { useEffect, useState } from "react";
import Message from "./Message";
import { useStore } from "../../app/store";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  const selectedConversation = useStore((state) => state.selectedConversation);
  const [messages, setMessages] = useState(null);
  const { getMessages } = useGetMessages();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedConversation === null) return;
      try {
        const res = await getMessages();
        setMessages(res || []); // Handling the case when res is null
      } catch (error) {
        console.log(error.message);
        setMessages([]);
      }
    };
    fetchData();
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
