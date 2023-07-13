import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";
import useUpdateTokenError from "../hooks/useUpdateTokenError";
import { updateTokenUser } from "../services/API_Chat/user.service";
//import { useSocket } from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [res, setRes] = useState(null);
  const [resOk, setResOk] = useState(false);
  // const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await updateTokenUser();
      setRes(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    useUpdateTokenError(res, setResOk);
  }, [res]);

  // let socket;
  // useEffect(() => {
  //   socket = useSocket(
  //     "http://localhost:8080",
  //     res?.data?.token,
  //     res?.data?.user,
  //     resOk
  //   );
  // }, [resOk, res]);

  // useEffect(() => {
  // }, [resOk, res]);

  return (
    <>
      <NavBar />
      <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
        <div className="d-flex flex-column align-items-center gap-5">
          {/* <h3> Hello 👋🏽 ! Here YOUR Profile</h3> */}
          {resOk && <Chat res={res.data} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
