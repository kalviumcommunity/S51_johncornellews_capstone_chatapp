import { useEffect } from "react";
import { useStore } from "../app/store.js";

export const useListenMessages = () => {
  const socket = useStore((state) => state.socket);
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  const setLatestMessage = useStore((state) => state.setLatestMessage);
  const authUser = useStore().authUser
  const handleNewMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
    const id =
      newMessage.senderId !== authUser._id
        ? newMessage.senderId
        : newMessage.receiverId;
    setLatestMessage(newMessage, id);
  };
  const handleDeleteMessage = (deletedmessage) => {
    setMessages(
      messages.filter((message) => message._id !== deletedmessage._id)
    );
  };
  const handleUpdateMessage = (newMessage) => {
    console.log(newMessage)
    const updatedMessages = messages.map((msg) =>
      msg._id === newMessage._id
        ? { ...msg, message: newMessage.message, updatedAt: new Date() }
        : msg
    );
    setMessages(updatedMessages);
  }
  useEffect(() => {
    socket?.on("newMessage", handleNewMessage);
    socket?.on("deletemessage", handleDeleteMessage);
    socket?.on("updatedmessage", handleUpdateMessage);
  }, [socket, messages, setMessages, setLatestMessage]);
};
