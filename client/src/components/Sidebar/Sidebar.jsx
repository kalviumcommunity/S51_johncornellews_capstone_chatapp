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
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');

  useEffect(() => {
    const getUsers = async () => {
      const jwt = Cookies.get("jwt");
      const res = await axios.post(
        "https://s51-johncornellews-capstone-chatapp.onrender.com/api/users/getusers",
        { jwt },
        { withCredentials: true, headers: headers }
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
