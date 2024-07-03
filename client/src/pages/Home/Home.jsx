import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { useEffect } from "react";
import { useStore } from "../../app/store.js";
import io from "socket.io-client";
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {
  const setSocket = useStore((state) => state.setSocket);
  const authUser = useStore((state) => state.authUser);
  const socket = useStore((state) => state.socket);
  const setOnlineUsers = useStore((state) => state.setOnlineUsers);
  const setLatestMessage = useStore().setLatestMessage;
  const jwt = Cookies.get("jwt");
  const runner = () => {
    if (authUser) {
      const socket = io.connect(
        "https://s51-johncornellews-capstone-chatapp.onrender.com",
        {
          query: {
            userID: authUser._id,
          },
        }
      );
      setSocket(socket);
      socket.on("onlineUsers", (users) => setOnlineUsers(users));
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  };
  useEffect(() => {
    console.log(authUser, "authuser");
    return () => runner();
  }, [authUser]);

  useEffect(() => {
    const setLatestMessages = async () => {
      try {
        const res = await axios.post(
          `https://s51-johncornellews-capstone-chatapp.onrender.com/api/message/getlatestmsg/${authUser._id}`,
          { jwt },
          { headers: {
            "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
          } }
        );  
        res.data.forEach((message) => {
          const id =
            message.senderId !== authUser._id
              ? message.senderId
              : message.receiverId;
          // Update the latest message for the corresponding user ID
          setLatestMessage(message, id);
          console.log(message.message, id);
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    setLatestMessages();
  }, [authUser, setLatestMessage]); // Include setLatestMessage in dependencies array

  const selectedConversation = useStore((state) => state.selectedConversation);

  return (
    <>
      <div className="flex font-mono">
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
