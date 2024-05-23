import { useEffect, useRef } from "react";
import Message from "./Message";
import { useStore } from "../../app/store";
import useGetMessages from "../../hooks/useGetMessages";
import { useListenMessages } from "../../hooks/useListenMessages";

const Messages = () => {
  const selectedConversation = useStore((state) => state.selectedConversation);
  const { getMessages } = useGetMessages();
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  useListenMessages();
  const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedConversation === null) return;
      try {
        const res = await getMessages();
        setMessages(res || []);
      } catch (error) {
        console.log(error.message);
        setMessages([]);
      }
    };

    fetchData();
  }, [selectedConversation]);

  useEffect(() => {
    // Scroll to the bottom of the messages div
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={ref} style={{ height: "300px" }} className="px-4 overflow-y-auto">
      {messages && messages.length === 0 ? (
        <>
          <h1 className="text-red-500">Start a conversation</h1>
          <h2 className="text-blue-400">Say Hi </h2>
        </>
      ) : (
        messages.map((message) => (
          <Message message={message} key={message._id} />
        ))
      )}
    </div>
  );
};

export default Messages;
