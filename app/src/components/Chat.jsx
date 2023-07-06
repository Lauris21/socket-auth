import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import ChatBar from "./ChatBar";

const Chat = ({ res }) => {
  const [socket, setSocket] = useState(null);
  const user = res.user;

  useEffect(() => {
    const socketConnect = socketIo.connect("http://localhost:8080", {
      extraHeaders: {
        "x-token": res.token,
      },
    });

    socketConnect.on("connect", () => {
      console.log("Socket online"),
        socketConnect.emit("New-User", { user, socketId: socketConnect.id });
    });

    socketConnect.on("disconnect", () => {
      console.log("Socket offline 💥");
    });

    socketConnect.on("send-message", () => {
      console.log("Socket online");
    });

    socketConnect.on("private-message", () => {
      console.log("Socket online");
    });

    setSocket(socketConnect);

    return () => {
      socketConnect.close();
    };
  }, [res, user]);

  return (
    <div>
      {/* <h3>{res.user.name}</h3> */}
      <ChatBar socket={socket} />
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
