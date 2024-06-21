import Conversation from "./Conversation";
import ChatSkeleton from "../../skeletons/ChatSkeleton";
import { useStore } from "../../app/store";

const Conversations = () => {
  const users = useStore().filteredUsers;

  return (
    <>
      {users == "No User Found" ? (
        <h1>No user Found</h1>
      ) : users ? (
        <div className="max-h-[20vw] overflow-y-scroll scrollbar-thin scrollbar-webkit">
          {users.map((user) => (
            <Conversation key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
        </>
      )}
    </>
  );
};

export default Conversations;
