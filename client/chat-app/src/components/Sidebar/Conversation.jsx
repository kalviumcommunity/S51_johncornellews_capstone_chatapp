import React, { useEffect } from "react";
import { useStore } from "../../app/store";

const Conversation = ({ user }) => {
  const setSelectedConversation = useStore(
    (state) => state.setSelectedConversation
  );
  const latestMessages = useStore((state) => state.latestMessages);
  const handleSelect = (id) => {
    setSelectedConversation(id);
  };
  const onlineUsers = useStore((state) => state.onlineUsers);
  const isOnline = onlineUsers.includes(user._id);

  useEffect(() => {
    // Fetch the latest message for this user from state
    // const latestMessage = latestMessages[user._id];
    console.log(latestMessages);
    // Do something with latestMessage if needed
  }, [latestMessages, user._id]);

  return (
    <>
      <div
        className="cursor-pointer rounded hover:bg-red-950 items-center justify-center flex p-4 gap-6"
        onClick={() => handleSelect(user._id)}
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
        <div className="flex flex-1 justify-center gap-7 items-center">
          <p className="font-bold text-gray-200">{user.fullName}</p>
        </div>
        {latestMessages[user._id] ? (
          <p>{latestMessages[user._id]["message"]}</p>
        ) : (
          <p>no message</p> 
        )}
        <div className="divider my-0 py-0 h-1" />
      </div>
    </>
  );
};

export default Conversation;
