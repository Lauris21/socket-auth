import { useAuth } from "../context/userContext";

const MessagesChat = ({ chat }) => {
  const { user } = useAuth();
  const messages = chat.messages;

  return (
    <div className="flex flex-col w-[95%] h-[70%]">
      <div className="flex w-full justify-around items-center">
        <h3>
          {chat.userTwo.email == user.email
            ? chat.userInit.email
            : chat.userTwo.email}
        </h3>
        <img
          src={
            chat.userTwo.image == user.image
              ? chat.userInit.image
              : chat.userTwo.image
          }
          alt="image user"
          className="w-10"
        />
      </div>
      <div className="h-full">
        <div className="flex flex-col">
          {messages && messages.map((item, i) => <p key={i}>{item.text}</p>)}
        </div>
      </div>
    </div>
  );
};

export default MessagesChat;
