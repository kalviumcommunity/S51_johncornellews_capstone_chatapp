import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { useEffect } from "react";
import { useStore } from "../../app/store.js";
import io from "socket.io-client";

const Home = () => {
  const setSocket = useStore((state) => state.setSocket);
  const authUser = useStore((state) => state.authUser);
  const socket = useStore((state) => state.socket);
  const setOnlineUsers = useStore((state) => state.setOnlineUsers);
  const onlineUsers = useStore((state) => state.onlineUsers);
  const runner = () => {
    if (authUser) {
      const socket = io.connect("http://localhost:7777", {
        query: {
          userID: authUser._id,
        },
      });
      setSocket(socket);
      socket.on("onlineUsers", (users) => setOnlineUsers(users));
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }
  useEffect(() => {
    console.log(authUser, "authuser")
    return () => runner()
  }, [authUser]);

  useEffect(() => console.log(onlineUsers, "onlineUsers"), [onlineUsers]);
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
