import { useEffect, useState } from "react";

const ChatBar = ({ socket, connect }) => {
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
  }, [connect]);

  return (
    <div>
      <div>
        <h4>Active User </h4>
        <div>
          {users &&
            users.map((user) => (
              <p key={user.user._id}>{`🟢 ${user.user.name}`}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
