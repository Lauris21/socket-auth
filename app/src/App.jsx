import { Outlet } from "react-router-dom";
import "./App.css";
//import socketIo from "socket.io-client";
//const socket = socketIo.connect("http://localhost:8080");

const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
