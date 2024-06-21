import { useEffect, useRef } from "react";
import Message from "./Message";
import { useStore } from "../../app/store";
import useGetMessages from "../../hooks/useGetMessages";
import { useListenMessages } from "../../hooks/useListenMessages";
import axios from "axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const Messages = () => {
  const selectedConversation = useStore((state) => state.selectedConversation);
  const { getMessages } = useGetMessages();
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  useListenMessages();
  const messageTobeEdited = useStore((state) => state.messageTobeEdited);
  const setMessageTobeEdited = useStore((state) => state.setMessageTobeEdited);
  const ref = useRef();
  const updateDialogRef = useRef();
  const updateMessageRefModal = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const jwt = Cookies.get("jwt");
  const deleteMessage = async () => {
    try {
      const res = await axios.patch(
        `https://s51-johncornellews-capstone-chatapp.onrender.com/api/message/deletemsg/${messageTobeEdited.id}`,
        { jwt },
        { withCredentials: true }
      );
      setMessageTobeEdited(null, null);
    } catch (error) {
      console.error("Error deleting message:", error.message);
    }
  };

  const updateMessage = () => {
    reset({ message: messageTobeEdited.message });
    updateMessageRefModal.current.showModal();
  };

  const handleUpdateMessage = async (data) => {
    try {
      console.log("Updating message with data:", data);
      const res = await axios.patch(
        `http://localhost:7777/api/message/updatemsg/${messageTobeEdited.id}`,
        { message: data.message },
        { withCredentials: true }
      );
      console.log("Response from server:", res.data);

      updateMessageRefModal.current.close();
    } catch (error) {
      console.error("Error updating message:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedConversation === null) return;
      try {
        const res = await getMessages();
        setMessages(res || []);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
        setMessages([]);
      }
    };

    fetchData();
  }, [selectedConversation]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={ref} style={{ height: "300px" }} className="px-4 overflow-y-auto">
      <dialog id="updateDeleteDialog" className="modal" ref={updateDialogRef}>
        <div className="modal-box">
          <p className="text-purple-400">{messageTobeEdited.message}</p>
          <p className="text-purple-400">{messageTobeEdited.id}</p>
          <form method="dialog" className="modal-backdrop">
            <div className="modal-action">
              <button
                onClick={deleteMessage}
                className="btn btn-outline btn-error mr-8"
              >
                delete
              </button>
              <button
                className="btn btn-outline btn-info"
                onClick={updateMessage}
              >
                edit
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <dialog id="updateInput" className="modal" ref={updateMessageRefModal}>
        <form onSubmit={handleSubmit(handleUpdateMessage)}>
          <div className="modal-box">
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs"
              {...register("message", { required: true })}
              defaultValue={messageTobeEdited.message}
            />
            {errors.message && <span>This field is required</span>}
            <div className="modal-action">
              <button className="btn" type="submit">
                done
              </button>
            </div>
          </div>
        </form>
      </dialog>
      {messages && messages.length === 0 ? (
        <>
          <h1 className="text-red-500">Start a conversation</h1>
          <h2 className="text-blue-400">Say Hi</h2>
        </>
      ) : (
        messages.map((message) => (
          <Message
            updateDialogRef={updateDialogRef}
            message={message}
            key={message._id}
          />
        ))
      )}
    </div>
  );
};

export default Messages;
