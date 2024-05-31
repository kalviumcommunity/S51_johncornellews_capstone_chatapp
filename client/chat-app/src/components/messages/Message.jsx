import React from "react";
import { useStore } from "../../app/store";
import { format, formatDistanceToNow } from "date-fns";

const Message = ({ message }) => {
  const authUser = useStore().authUser;
  const current_user_id =
    authUser._id || JSON.parse(localStorage.getItem("user"))._id;

  const createdAt = new Date(message.createdAt);
  const updatedAt = new Date(message.updatedAt);

  // Format the creation and update times
  const formattedTime = format(createdAt, "PPpp");
  const formattedTime2 = format(updatedAt, "PPpp");

  // Function to display time based on how recent it is
  const displayTime = (date) => {
    const diffInHours = Math.floor((new Date() - date) / (1000 * 60 * 60));
    if (diffInHours < 3) {
      // Return a human-readable string if within 3 hours
      return `${formatDistanceToNow(date, { addSuffix: true })}`;
    }
    // Return formatted date if more than 3 hours
    return format(date, "PPpp");
  };

  // Component for displaying the "edited" label
  const EditedLabel = ({ isEdited }) => {
    return isEdited ? (
      <p style={{ textAlign: "right" }} className="text-red-400">
        edited
      </p>
    ) : null;
  };

  return (
    <div
      className={`chat ${
        current_user_id === message.receiverId ? "chat-start" : "chat-end"
      }`}
    >
      <div className="chat-bubble">
        {message.message}
        <EditedLabel isEdited={createdAt.getTime() !== updatedAt.getTime()} />
      </div>
      <div className="chat-footer">
        <p>{displayTime(updatedAt)}</p>
      </div>
    </div>
  );
};

export default Message;
