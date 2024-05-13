import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axios from "axios";
import ChatSkeleton from "../../skeletons/ChatSkeleton";

const Conversations = () => {
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const res = await axios.get("http://localhost:7777/api/users/getusers", {
      withCredentials: true,
    });
    setTimeout(() => {
      setUsers(res.data);
    }, 300);
    console.log(res.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {users ? (
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
