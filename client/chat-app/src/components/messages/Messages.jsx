import { useEffect, useRef } from "react";
import Message from "./Message";
import { useStore } from "../../app/store";
import useGetMessages from "../../hooks/useGetMessages";
import { useListenMessages } from "../../hooks/useListenMessages";
import axios from "axios";

const Messages = () => {
  const selectedConversation = useStore((state) => state.selectedConversation);
  const { getMessages } = useGetMessages();
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  useListenMessages();
  const messageTobeEdited = useStore().messageTobeEdited;
  const setMessageTobeEdited = useStore().setMessageTobeEdited;
  const ref = useRef();
  const updateDialogRef = useRef();
  const updateMessageRefModal = useRef()
  const deleteMessage = async () => {
    try {
      console.log("deleting message");
      const res = await axios.delete(
        `http://localhost:7777/api/message/deletemsg/${messageTobeEdited}`,
        { withCredentials: true }
      );
      const newMessages = messages.filter(
        (message) => message._id != messageTobeEdited
      );
      setMessages(newMessages);
      setMessageTobeEdited(null);
      updateDialogRef.current.hide();
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateMessage = async () => {};
  useEffect(() => {
    const fetchData = async () => {
      if (selectedConversation === null) return;
      try {
        const res = await getMessages();
        setMessages(res || []);
      } catch (error) {
        console.log(error.message);
        setMessages([]);
      }
    };

    fetchData();
  }, [selectedConversation]);

  useEffect(() => {
    // Scroll to the bottom of the messages div
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={ref} style={{ height: "300px" }} className="px-4 overflow-y-auto">
      <dialog id="my_modal_2" className="modal" ref={updateDialogRef}>
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={deleteMessage}
                className="btn btn-outline btn-error mr-8"
              >
                delete
              </button>
            </form>
            <button className="btn btn-outline btn-info">edit</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {messages && messages.length === 0 ? (
        <>
          <h1 className="text-red-500">Start a conversation</h1>
          <h2 className="text-blue-400">Say Hi </h2>
        </>
      ) : (
        messages.map((message) => (
          <Message
            updateDialogRef={updateDialogRef}
            deleteMessage={deleteMessage}
            updateMessage={updateMessage}
            message={message}
            key={message._id}
          />
        ))
      )}
    </div>
  );
};

export default Messages;
