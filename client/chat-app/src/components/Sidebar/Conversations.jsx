import Conversation from "./Conversation";
import ChatSkeleton from "../../skeletons/ChatSkeleton";

const Conversations = ({ users }) => {
  return (
    <>
      {users === "No User Found" ? (
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
