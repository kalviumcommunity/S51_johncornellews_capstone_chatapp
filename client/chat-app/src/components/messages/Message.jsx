import React from "react";
import { useStore } from "../../app/store";

const Message = ({ message }) => {
  const authUser = useStore().authUser;
  const current_user_id =
    authUser._id || JSON.parse(localStorage.getItem("user"))._id;

  return (
    <>
      <div
        className={
          current_user_id === message.receiverId
            ? `chat chat-start`
            : "chat chat-end"
        }
      >
        <div className="chat-bubble">{message.message}</div>
        <div className="chat-footer">
          <span>Seen : 12:56</span>
        </div>
      </div>
    </>
  );
};

export default Message;
