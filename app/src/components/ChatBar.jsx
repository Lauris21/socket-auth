import { useEffect, useState } from "react";
import { useAuth } from "../context/userContext";
import ModalNewChat from "./ModalNewChat";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

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
      <div>Chats....</div>
    </div>
  );
};

export default ChatBar;
