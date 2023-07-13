import { useEffect } from "react";

const Messages = ({ messages }) => {
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <>
      {messages.map((message, i) => (
        <div key={i}>
          <p>{message.message}</p>
        </div>
      ))}
    </>
  );
};

export default Messages;
