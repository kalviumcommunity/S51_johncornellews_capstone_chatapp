import { useEffect } from "react";
import { useStore } from "../app/store.js";

export const useListenMessages = () => {
  const socket = useStore((state) => state.socket);
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  const setLatestMessage = useStore((state) => state.setLatestMessage);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
      setLatestMessage(newMessage, newMessage.receiverId); 
    });
  }, [socket, messages, setMessages, setLatestMessage]);
};
