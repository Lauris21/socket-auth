import { useEffect, useState } from "react";
import Messages from "./Messages";
import { useAuth } from "../context/userContext";
import { getChatById } from "../services/API_Chat/chat.services";
import MessagesChat from "./MessagesChat";

const ChatBody = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [chat, setChat] = useState(null);
  const { showChat } = useAuth();

  const id = "";

  useEffect(() => {
    //Recibimos mensaje del server
    socket.on("get-message", (payload) => {
      setMessages(payload);
    });
  }, [socket]);

  useEffect(() => {
    const getChat = async () => {
      const data = await getChatById(showChat);
      console.log(showChat);
      setChat(data.data);
    };
    showChat && getChat();
    console.log(chat);
  }, [showChat]);

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
    <div className="flex flex-col justify-between col-span-2 items-center">
      {chat ? (
        <MessagesChat chat={chat} />
      ) : (
        <p> WELLCOME, INIT A NEW CHAT 💬</p>
      )}
      {/* {messages && <Messages messages={messages} />} */}

      {/* <form onSubmit={(e) => handleSumbit(e)}>
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
      </form> */}
    </div>
  );
};

export default ChatBody;
