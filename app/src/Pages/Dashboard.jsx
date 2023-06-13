import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import NavBar from "../components/NavBar";

import socketIo from "socket.io-client";
import useUpdateTokenError from "../hooks/useUpdateTokenError";
import { updateTokenUser } from "../services/API_Chat/user.service";
const socket = socketIo.connect("http://localhost:8080");

const Dashboard = () => {
  const [res, setRes] = useState(null);
  const [resOk, setResOk] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await updateTokenUser();
      setRes(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(res);
    useUpdateTokenError(res, setResOk);
  }, [res]);
  return (
    <>
      <NavBar />
      <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
        <div className="d-flex flex-column align-items-center gap-5">
          <h3> Hello 👋🏽 ! Here YOUR Profile</h3>
          {resOk && <Chat />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
