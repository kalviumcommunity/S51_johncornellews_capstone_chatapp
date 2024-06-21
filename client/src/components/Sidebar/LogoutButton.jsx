import { CgLogOut } from "react-icons/cg";
import useLogout from "../../hooks/useLogout";
const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div
      className="logout mt-auto btn btn-circle hover:bg-red-950"
      onClick={logout}
    >
      <CgLogOut />
    </div>
  );
};

export default LogoutButton;
