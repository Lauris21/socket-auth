import { useEffect } from "react";
import socketIo from "socket.io-client";

const Chat = ({ res }) => {
  const socketConnect = socketIo.connect("http://localhost:8080", {
    extraHeaders: {
      "x-token": res.token,
    },
  });
  //   socketConnect = socketIo({
  //     extraHeaders: {
  //       "x-token": res.token,
  //     },
  //   });
  //   useEffect(() => {
  //     console.log(socketConnect);
  //   }, []);

  return <div></div>;
};

export default Chat;
