const MessagesChat = ({ chat }) => {
  const messages = chat.messages;
  console.log(messages);

  return (
    <div className="flex flex-col w-[95%] h-full">
      <div className="flex w-full justify-around items-center">
        <h3>{chat.userTwo.email}</h3>
        <img src={chat.userTwo.image} alt="image userTwo" className="w-10" />
      </div>
      <div className="h-[90%]">
        <div>{messages && messages.map((item) => item.text)}</div>
      </div>
    </div>
  );
};

export default MessagesChat;
