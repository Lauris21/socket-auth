import { useContext, useEffect } from "react";
import { UserContext } from "../constext/userContext";

// import socketIo from "socket.io-client";
// const socket = socketIo.connect("http://localhost:8080");

const Dashboard = () => {
  const { logout, user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);
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
