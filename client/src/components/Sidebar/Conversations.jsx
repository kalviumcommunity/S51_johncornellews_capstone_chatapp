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
        users.map((user) => <Conversation key={user._id} user={user} />)
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
