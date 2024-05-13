import Search from "./Search";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const getUsers = async () => {
    const res = await axios.get("http://localhost:7777/api/users/getusers", {
      withCredentials: true,
    });
    setTimeout(() => {
      setUsers(res.data);
      setFilteredUsers(res.data)
    }, 300);
    console.log(res.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Search users={users} setFilteredUsers={setFilteredUsers} />
      <div className="divider m-0 p-0" />
      <Conversations users={filteredUsers} />
      <div className="divider m-0 p-0" />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
