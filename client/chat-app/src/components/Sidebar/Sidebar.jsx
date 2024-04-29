
import Search from "./Search";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div>
      <Search />
      <div className="divider m-0 p-0" />
      <Conversations />
      <div className="divider m-0 p-0" />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
