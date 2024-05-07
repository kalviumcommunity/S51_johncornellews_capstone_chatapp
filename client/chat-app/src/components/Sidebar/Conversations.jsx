import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axios from "axios";

const Conversations = () => {
  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const res = await axios.get("http://localhost:7777/api/users/getusers", {
      withCredentials: true,
    });
    setUsers(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {users &&
        users.map((user) => <Conversation key={user._id} user={user} />)}
    </>
  );
};

export default Conversations;
