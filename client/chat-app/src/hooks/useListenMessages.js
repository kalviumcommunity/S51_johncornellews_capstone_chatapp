import { useEffect } from "react";
import { useStore } from "../app/store.js";

export const useListenMessages = () => {
  const socket = useStore((state) => state.socket);
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  const setLatestMessage = useStore((state) => state.setLatestMessage);
  const authUser = useStore().authUser
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
      const id =
        newMessage.senderId !== authUser._id
          ? newMessage.senderId
          : newMessage.receiverId; 
      setLatestMessage(newMessage, id); 
    });
  }, [socket, messages, setMessages, setLatestMessage]);
};
