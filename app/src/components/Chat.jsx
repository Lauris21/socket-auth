import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import ChatBar from "./ChatBar";
import AnimationHome from "./UI/AnimationHome";

const Chat = ({ res }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
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

    // socketConnect.on("send-message", () => {
    //   console.log("Socket online");
    // });

    // socketConnect.on("private-message", () => {
    //   console.log("Socket online");
    // });

    setSocket(socketConnect);

    return () => {
      socketConnect.close();
    };
  }, [res, user]);

  const handleClick = () => {
    socket.emit("New-User", { user, socketId: socket.id });
    setConnect(true);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <>
      {connect ? (
        <div>
          <ChatBar socket={socket} />
          <h3>Enviar mensaje</h3>
          <form onSubmit={(e) => handleSumbit(e)}>
            {/* <input type="text" id="textId" autoComplete="off" /> */}
            <input
              type="text"
              id="text-message"
              autoComplete="off"
              placeholder="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button>Send</button>
          </form>
          <button
            className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl m-6 w-56 place-self-center"
            onClick={() => setConnect(false)}
          >
            Desconectar
          </button>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-96px)] flex flex-col justify-between items-center">
        <div className="w-[90%] flex flex-col self-align-center mt-52 md:gap-20">
          <h3 className="text-4xl font-semibold drop-shadow-[11px_-3px_4px_rgba(0,180,219,0.28)] text-center leading-[4.5rem]">
            Wellcome {res.user.name}{" "}
            <span className="animate-wavingHand ">👋🏽</span>
          </h3>
          <button
            className="bg-lightBlue hover:bg-darkBlue text-darkGray hover:text-lightGray font-bold py-2 px-4 rounded-2xl m-6 w-56 place-self-center"
            onClick={handleClick}
          >
            Conectar
          </button>
          </div>
          <AnimationHome />
       
        </div>
      )}
    </>
  );
};

export default Chat;
