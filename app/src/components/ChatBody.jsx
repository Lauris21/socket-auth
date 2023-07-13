import { useEffect, useState } from "react";
import Messages from "./Messages";

const ChatBody = ({ socket }) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState(null);
  const id = "";

  useEffect(() => {
    //Recibimos mensaje del server
    socket.on("get-message", (payload) => {
      setMessages(payload);
    });
  }, [socket]);

  const handleSumbit = (e) => {
    e.preventDefault();
    socket.emit("send-message", { message, id });
    setMessage("");
  };

  //Enviamos mensaje con boton "Enter"
  const handleKeyCode = (keyCode) => {
    if (keyCode !== 13) return;
    if (message == "") return;
    socket.emit("send-message", { message, id });
  };

  return (
    <>
      {messages && <Messages messages={messages} />}
      <h3>Enviar mensaje</h3>
      <form onSubmit={(e) => handleSumbit(e)}>
        <input
          type="text"
          id="text-message"
          autoComplete="off"
          placeholder="message"
          autoFocus
          value={message}
          onKeyUp={(keyCode) => handleKeyCode(keyCode)}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </>
  );
};

export default ChatBody;
