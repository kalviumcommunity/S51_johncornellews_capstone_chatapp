import { CgLogOut } from "react-icons/cg";
const LogoutButton = () => {
  return (
    <div className="logout mt-auto btn btn-circle hover:bg-red-950">
      <button>
        <CgLogOut />
      </button>
    </div>
  );
};

export default LogoutButton;
