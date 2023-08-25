import { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

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
          users.map((user) => (
            <option key={user.user._id}>{`🟢 ${user.user.name}`}</option>
          ))}
      </select>
      <button>NEW CHAT</button>
      <div>Chats....</div>
    </div>
  );
};

export default ChatBar;
