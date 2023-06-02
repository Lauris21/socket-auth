import { useContext } from "react";
import { UserContext } from "../constext/userContext";

const Dashboard = () => {
  const { logout } = useContext(UserContext);

  return (
    <>
      <div>Dashboard</div>
      <br />
      <button className="btn btn-primary" onClick={() => logout()}>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
