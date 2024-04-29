import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="divider-vertical m-0 p-0" />
      <MessageContainer />
    </div>
  );
};

export default Home;
