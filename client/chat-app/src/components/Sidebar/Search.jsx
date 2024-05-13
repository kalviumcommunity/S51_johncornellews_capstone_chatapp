import React, { useState } from "react";

const Search = ({ setFilteredUsers, users }) => {
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    console.log(term);
    if (term.trim() == "") {
      setFilteredUsers(users);
      return;
    }
    const filteredUsers = users.filter((user) =>
      user.fullName.toLowerCase().includes(term) ? true : false
    );
    setFilteredUsers(!filteredUsers ? "No User Found" : filteredUsers);
  };

  return (
    <input type="text" placeholder="Search users" onChange={handleSearch} />
  );
};

export default Search;
