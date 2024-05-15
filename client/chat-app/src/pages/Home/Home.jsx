import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { useEffect } from "react";
import { useStore } from "../../app/store.js";
import io from "socket.io-client";

const Home = () => {
  const setSocket = useStore((state) => state.setSocket);
  const authUser = useStore((state) => state.authUser);
  const socket = useStore((state) => state.socket);

  useEffect(() => {
    if (authUser) {
      const socket = io.connect("http://localhost:7777"); // Corrected
      setSocket(socket);
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  const selectedConversation = useStore((state) => state.selectedConversation);
  useEffect(() => {
    console.log(selectedConversation);
  }, [selectedConversation]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="divider-vertical m-0 p-0" />
        {!selectedConversation ? (
          <h1>Select a convo and start messaging</h1>
        ) : (
          <MessageContainer />
        )}
      </div>
    </>
  );
};

export default Home;
