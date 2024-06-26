import React, { useEffect } from "react";
import { useStore } from "../../app/store";

const Conversation = ({ user }) => {
  const setSelectedConversation = useStore(
    (state) => state.setSelectedConversation
  );
  const setSelectedUser = useStore().setSelectedUser
  const latestMessages = useStore((state) => state.latestMessages);
  const handleSelect = (id, fullName) => {
    setSelectedConversation(id);
    setSelectedUser(fullName)
  };
  const onlineUsers = useStore((state) => state.onlineUsers);
  const isOnline = onlineUsers.includes(user._id);
  const selectedConversation = useStore().selectedConversation;


  return (
    <>
      <div
        className={`cursor-pointer rounded ${
          selectedConversation === user._id && "bg-red-950"
        } hover:bg-red-950 items-center justify-center flex p-4 gap-61`}
        onClick={() => handleSelect(user._id, user.fullName)}
      >
        <div className="flex gap-2 items-center py-2 px-1">
          <div className={`avatar  ${isOnline ? "online" : "offline"} `}>
            <img
              className="rounded-full"
              style={{ maxHeight: "30px" }}
              src={user.profilePic}
              alt={user.fullName}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center items-center">
          <p className="font-bold text-gray-200">{user.fullName}</p>
          {latestMessages[user._id] && (
            <p>{latestMessages[user._id]["message"].slice(0, 7)}...</p>
          )}
        </div>

        <div className="divider my-0 py-0 h-1" />
      </div>
    </>
  );
};

export default Conversation;
