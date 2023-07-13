import { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("active-users", (data) => {
      setUsers(data);
    });

    socket.on("disconnect-user", (data) => {
      setUsers(data);
    });
  }, [socket, users]);

  return (
    <div>
      <h2>Open chat</h2>
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
