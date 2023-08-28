const MessagesChat = ({ chat }) => {
  const messages = chat.messages;
  console.log(messages);

  return (
    <div className="flex flex-col w-[95%] h-[70%]">
      <div className="flex w-full justify-around items-center">
        <h3>{chat.userTwo.email}</h3>
        <img src={chat.userTwo.image} alt="image userTwo" className="w-10" />
      </div>
      <div className="h-full">
        <div className="flex flex-col">
          {messages && messages.map((item) => <p>{item.text}</p>)}
        </div>
      </div>
    </div>
  );
};

export default MessagesChat;
