import { useEffect } from "react";
import { useStore } from "../app/store.js";

export const useListenMessages = () => {
  const socket = useStore().socket;
  const messages = useStore().messages;
  const setMessages = useStore().setMessages;

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
  }, [socket, setMessages]);
};