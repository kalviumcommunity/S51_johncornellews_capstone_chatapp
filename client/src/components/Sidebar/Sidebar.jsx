import Search from "./Search";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../app/store";
import Profile from "./Profile";
import Cookies from "js-cookie";

const Sidebar = () => {
  const users = useStore().users;
  const filteredUsers = useStore().filteredUsers;
  const setFilteredUsers = useStore().setFilteredUsers;
  const setUsers = useStore().setUsers;
  

  useEffect(() => {
    const getUsers = async () => {
      const jwt = Cookies.get("jwt");
      const res = await axios.post(
        "https://s51-johncornellews-capstone-chatapp.onrender.com/api/users/getusers",
        { jwt },
        { headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } }
      );
      setUsers(res.data);
      setFilteredUsers(res.data);
      console.log(res.data);
    };
    return () => getUsers();
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
