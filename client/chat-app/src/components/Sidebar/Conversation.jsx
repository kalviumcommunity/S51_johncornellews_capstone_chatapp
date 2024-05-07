import { FaUserNinja } from "react-icons/fa";

const Conversation = ({user}) => {
  return (
    <>
      <div className="cursor-pointer rounded hover:bg-red-950 items-center justify-center flex p-4 gap-6">
        <div className="flex gap-2 items-center py-2 px-1">
          <div className="avatar online">
            <img style={{maxHeight: "30px"}} src={user.profilePic} />
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
