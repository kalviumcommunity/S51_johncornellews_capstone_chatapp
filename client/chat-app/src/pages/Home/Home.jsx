import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { useEffect } from "react";
import { useStore } from "../../app/store.js";

const Home = () => {

  const authUser = useStore((state) => state.authUser);
  useEffect(() => {
    console.log(authUser, "authUser");
  }, [authUser]);

  return (
  <>
    <div className="flex">
      <Sidebar />
      <div className="divider-vertical m-0 p-0" />
      <MessageContainer />
    </div>
  </>

  );
};

export default Home;
