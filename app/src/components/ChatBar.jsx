import { useEffect, useState } from "react";
import { useAuth } from "../context/userContext";
import ModalNewChat from "./ModalNewChat";
import { getMeChats } from "../services/API_Chat/chat.services";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [meChats, setMeChats] = useState([]);
  const { user, newChat, showChat, setShowChat } = useAuth();

  useEffect(() => {
    socket.on("active-users", (data) => {
      setUsers(data);
    });
  }, [socket, users]);

  useEffect(() => {
    socket.on("disconnected-user", (data) => {
      setUsers(data);
    });
  }, [socket, users]);

  useEffect(() => {
    const getChats = async () => {
      const chats = await getMeChats();
      setMeChats(await chats.data);
    };
    getChats();
  }, [newChat]);

  return (
    <div className="flex flex-col w-[85%] items-center gap-5 p-5">
      {/* <div>
        <h4>Active User </h4>
        <div>
          {users &&
            users.map((user) => (
              <p key={user.user._id}>{`🟢 ${user.user.name}`}</p>
            ))}
        </div>
      </div> */}
      <select>
        <option value="" hidden>
          ACTIVE USERS
        </option>
        {users &&
          users
            .filter((item) => item.user.email !== user.email)
            .map((item) => (
              <option key={item.user._id}>{`🟢 ${item.user.name}`}</option>
            ))}
      </select>
      {/* <button>NEW CHAT</button> */}
      <ModalNewChat />
      <div className="flex flex-col items-center">
        <p className="p-2">CHATS</p>
        {/* {user && user.chat.map((item) => <p>{item._id}</p>)} */}
        {meChats &&
          meChats.map((item, i) => (
            <p
              className="hover:text-lg hover:bg-darkBlue cursor-pointer p-2 rounded"
              key={i}
              onClick={() => setShowChat(() => item._id)}
            >
              {item.userTwo.name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default ChatBar;
