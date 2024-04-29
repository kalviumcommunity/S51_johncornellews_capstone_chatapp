import React from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";

const MessageInput = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const Onsubmit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit(Onsubmit)}>
        <input 
            type="text"
            placeholder="send a message"
        />
        <button className="btn btn-ghost btn-circle">
          <IoIosSend />
        </button>
      </form>
    </>
  );
};

export default MessageInput;
