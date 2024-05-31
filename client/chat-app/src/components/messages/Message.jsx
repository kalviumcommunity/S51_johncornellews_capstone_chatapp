import React from "react";
import { useStore } from "../../app/store";
import { format, formatDistanceToNow } from "date-fns";

const Message = ({ message }) => {
  const authUser = useStore().authUser;
  const current_user_id =
    authUser._id || JSON.parse(localStorage.getItem("user"))._id;

  const createdAt = new Date(message.createdAt);
  const updatedAt = new Date(message.updatedAt);

  const formattedTime = createdAt;
  const formattedTime2 = updatedAt;

  const displayTime = (date) => {
    const diffInHours = (new Date() - date) / (1000 * 60 * 60);
    if (diffInHours < 1) {
      // returns an human readable string 
      return `${formatDistanceToNow(date, { addSuffix: true })}`;
    }
    // normal date formatting
    return format(date, "PPpp");
  };

  return (
    <div
      className={`chat ${
        current_user_id === message.receiverId ? "chat-start" : "chat-end"
      }`}
    >
      <div className="chat-bubble">
        {message.message}
        {/* .getTime returns the exact mille seconds of the date  */}
        {formattedTime.getTime() !== formattedTime2.getTime() && (
          <p style={{ textAlign: "right" }} className="text-red-400">
            edited
          </p>
        )}
      </div>
      <div className="chat-footer">
        <p>{displayTime(formattedTime2)}</p>
      </div>
    </div>
  );
};

export default Message;
