import NavBar from "../components/NavBar";

import socketIo from "socket.io-client";
const socket = socketIo.connect("http://localhost:8080");

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
        <div className="d-flex flex-column align-items-center gap-5">
          <h3> Hello 👋🏽 ! Here YOUR Profile</h3>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
