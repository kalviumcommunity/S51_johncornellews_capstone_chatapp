import React from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage(); // Destructure loading state
  const {
    register,
    reset, // Corrected to reset instead of resetField
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await sendMessage(data.message);
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="send a message"
          {...register("message", { required: "empty messages not allowed" })}
        />
        <button
          type="submit"
          className="btn btn-ghost btn-circle"
          disabled={loading}
        >
          {/* Disable button when loading */}
          <IoIosSend />
        </button>
      </form>
    </>
  );
};

export default MessageInput;
