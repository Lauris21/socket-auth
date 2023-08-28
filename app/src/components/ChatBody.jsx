import { useEffect, useState } from "react";
import Messages from "./Messages";
import { useAuth } from "../context/userContext";
import { getChatById } from "../services/API_Chat/chat.services";
import MessagesChat from "./MessagesChat";
import { createMessage } from "../services/API_Chat/message.service";

const ChatBody = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [chat, setChat] = useState(null);
  const [res, setRres] = useState(null);
  const { showChat } = useAuth();

  const id = "";

  useEffect(() => {
    //Recibimos mensaje del server
    socket.on("get-message", (payload) => {
      setMessages(payload.message);
    });
  }, [message]);

  useEffect(() => {
    const getChat = async () => {
      const data = await getChatById(showChat);
      setChat(data.data);
    };
    showChat && getChat();
  }, [showChat]);

  const handleClick = async () => {
    const data = {
      text: message,
      chat: chat._id,
    };
    setRres(await createMessage(data));
    socket.emit("send-message", { message, id });
    setMessage("");
  };

  //Enviamos mensaje con boton "Enter"
  const handleKeyCode = (keyCode) => {
    if (keyCode !== 13) return;
    if (message == "") return;
    console.log(message);
    socket.emit("send-message", { message, id });
  };

  return (
    <div className="flex flex-col justify-between col-span-2 items-center">
      {chat ? (
        <>
          <MessagesChat chat={chat} />
          {messages && <Messages messages={messages} />}
          <div>
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
            <button onClick={() => handleClick()}>Send</button>
          </div>
        </>
      ) : (
        <p> WELLCOME, INIT A NEW CHAT 💬</p>
      )}
    </div>
  );
};

export default ChatBody;
