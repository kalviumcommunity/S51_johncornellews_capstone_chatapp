import React from "react";
import { useForm } from "react-hook-form";
import { FaSearchDollar } from "react-icons/fa";

const Search = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <form className="flex items-center gap-2">
      <input type="text" placeholder="Search users" />
      <button className="btn btn-circle">
        <FaSearchDollar />
      </button>
    </form>
  );
};

export default Search;
