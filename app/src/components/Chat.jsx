import { useEffect } from "react";
import socketIo from "socket.io-client";
import ChatBar from "./ChatBar";

const Chat = ({ res }) => {
  const socketConnect = socketIo.connect("http://localhost:8080", {
    extraHeaders: {
      "x-token": res.token,
    },
  });

  const drawUsers = (users = []) => {
    console.log(users);
    // if (users !== []) {
    //   users.forEach((user) => console.log("user", user));
    // }
  };

  socketConnect.on("connect", () => {
    console.log("Socket online");
  });

  socketConnect.on("disconnect", () => {
    console.log("Socket offline 💥");
  });

  socketConnect.on("send-message", () => {
    console.log("Socket online");
  });

  socketConnect.on("active-users", drawUsers);

  socketConnect.on("private-message", () => {
    console.log("Socket online");
  });

  useEffect(() => {
    console.log(res.user);
  }, [res]);

  return (
    <div>
      {/* <h3>{res.user.name}</h3> */}
      <ChatBar />
      <h3>Enviar mensaje</h3>
      <input type="text" id="textId" autoComplete="off" />
      <input
        type="text"
        id="text-message"
        autoComplete="off"
        placeholder="message"
      />
    </div>
  );
};

export default Chat;
