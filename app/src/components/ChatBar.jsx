import { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("active-users", (data) => setUsers(data));
  }, [socket, users]);

  useEffect(() => {
    console.log("UUUUUUUUUUUUUUUUUUUUUUUU", users);
  }, [users]);

  return (
    <div>
      <h2>Open chat</h2>
      <div>
        <h4>Active User</h4>
        <div>
          {/* {users.map((user) => (
            <p key={user._id}>{user.name}</p>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
