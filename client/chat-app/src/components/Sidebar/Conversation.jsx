import { FaUserNinja } from "react-icons/fa";
import { useStore } from "../../app/store";

const Conversation = ({ user }) => {
  const setSelectedConversation = useStore().setSelectedConversation;
  const handleSelect = (id) => {
    setSelectedConversation(id);
  };
  const onlineUsers = useStore().onlineUsers;
  const isOnline = onlineUsers.includes(user._id);
  return (
    <>
      <div
        className="cursor-pointer rounded hover:bg-red-950 items-center justify-center flex p-4 gap-6"
        onClick={() => handleSelect(user._id)}
      >
        <div className="flex gap-2 items-center py-2 px-1">
          <div className={`avatar  ${isOnline ? "online" : "offline"} `}>
            <img style={{ maxHeight: "30px" }} src={user.profilePic} />
          </div>
        </div>
        <div className="flex flex-1 justify-center gap-7 items-center">
          <p className="font-bold text-gray-200">{user.fullName}</p>
        </div>
        <div className="divider my-0 py-0 h-1" />
      </div>
    </>
  );
};

export default Conversation;
