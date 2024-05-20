import Search from "./Search";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../app/store";
import Profile from "./Profile";

const Sidebar = () => {
  const users = useStore().users;
  const filteredUsers = useStore().filteredUsers;
  const setFilteredUsers = useStore().setFilteredUsers;
  const setUsers = useStore().setUsers;
  const getUsers = async () => {
    const res = await axios.get("http://localhost:7777/api/users/getusers", {
      withCredentials: true,
    });
    setUsers(res.data);
    setFilteredUsers(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Profile />
      <Search users={users} setFilteredUsers={setFilteredUsers} />
      <div className="divider m-0 p-0" />
      <Conversations users={filteredUsers} />
      <div className="divider m-0 p-0" />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
