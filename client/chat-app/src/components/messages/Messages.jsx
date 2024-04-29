import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div style={{height:"300px"}} className="px-4 overflow-y-auto">
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
