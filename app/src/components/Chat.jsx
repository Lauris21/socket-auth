import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import ChatBar from "./ChatBar";

const Chat = ({ res }) => {
  const [socket, setSocket] = useState(null);

  const [message, setMessage] = useState("");

  const user =  res.user

  const [connect, setConnect] = useState(false)

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

  // const sendNewUser = async (socket) => {
  //   await socket.emit("New-User", { user, socketId: socket.id });
  //   console.log("entro");
  // };

  // useEffect(()=> {
  //   socket && socket.emit("New-User", { user, socketId: socket.id });
  // }, [socket, user])

  const handleClick = () => {
    socket.emit("New-User", { user, socketId: socket.id });
    setConnect(true)
    
  }

  const handleSumbit = (e) => {
    e.preventDefault()
    console.log(message);
    socket.emit("message", message)
    setMessage("")
  }
  return (
    <>
      
      <h3>{res.user.name}</h3>
      <button onClick={handleClick}>Conectar</button>
      {connect && <> <ChatBar socket={socket} />
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
      </form> </>}
     
    </>
  );
};

export default Chat;
