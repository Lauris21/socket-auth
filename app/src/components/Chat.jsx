import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import ChatBar from "./ChatBar";
import AnimationHome from "./UI/AnimationHome";
import ChatBody from "./ChatBody";
import Connected from "./Connected";

const Chat = ({ res }) => {
  const [newChat, setNewChat] = useState(false);
  const [socket, setSocket] = useState(null);
  const user = res.user;
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    //Autentificamos el socket y le enviamos el token al server
    const socketConnect = socketIo.connect("http://localhost:8080", {
      extraHeaders: {
        "x-token": res.token,
      },
    });

    socketConnect.on("connect", () => {
      console.log("Socket online");
    });

    socketConnect.on("disconnect", () => {
      console.log("Socket offline 💥");
    });

    // socketConnect.on("private-message", () => {
    //   console.log("Socket online");
    // });

    setSocket(socketConnect);
    console.log(newChat);

    return () => {
      socketConnect.close();
    };
  }, [res, user, newChat]);

  const handleClick = () => {
    socket.emit("New-User", { user, socketId: socket.id });
    setConnect(true);
  };

  const handleDisconnect = () => {
    setConnect(false);
    socket.emit("disconnect-user");
  };

  const disableLogout = () => {
    if (connect) {
      const boxLogout = document.querySelector("#boxLogout");
      boxLogout.innerHTML = "";
      boxLogout.innerHTML = Connected();
    }
  };

  return (
    <>
      {connect ? (
        <div className="flex flex-col justify-around md:grid md:grid-cols-3 md:p-8 w-full min-h-[calc(100vh-96px)]">
          <ChatBar socket={socket} connect={connect} setNewChat={setNewChat} />
          <ChatBody socket={socket} />
          <button
            className="md:absolute md:bottom-8 md:left-8 bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl m-6 w-56 place-self-center"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-96px)] flex flex-col justify-between items-center">
          <div className="w-[90%] flex flex-col self-align-center mt-20 md:mt-52 gap-8 md:gap-20">
            <h3 className="text-4xl font-semibold drop-shadow-[11px_-3px_4px_rgba(0,180,219,0.28)] text-center leading-[4.5rem]">
              Wellcome {res.user.name}{" "}
              <span className="animate-wavingHand ">👋🏽</span>
            </h3>
            <button
              className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl m-6 w-56 place-self-center"
              onClick={handleClick}
            >
              Connect
            </button>
          </div>
          <AnimationHome />
        </div>
      )}
    </>
  );
};

export default Chat;
