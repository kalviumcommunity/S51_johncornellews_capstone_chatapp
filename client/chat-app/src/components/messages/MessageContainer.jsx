import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useStore } from "../../app/store";

const MessageContainer = () => {
  const authUser = useStore().authUser
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <div className="px-5 py-3 mb-2">{authUser.fullName}</div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
