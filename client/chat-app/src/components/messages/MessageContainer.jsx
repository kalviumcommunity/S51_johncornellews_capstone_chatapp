import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <div className="px-5 py-3 mb-2">John Cornellews</div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
