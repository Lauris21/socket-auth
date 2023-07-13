import { useEffect, useState } from "react";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
      socket.on("active-users", (data) => {
        console.log("DAATAaFAAKE", data);
        setUsers(data);
      });

    socket.on("disconnect-user", (data) => {
      setUsers(data), console.log("DAAAAATTAAAAAA", data);
    });
  }, [socket, users]);

  //   const active = async () => {
  //     socket.on("active-users", (data) => {
  //         console.log("DAATAaFAAKE", data);
  //         setUsers(data);
  //       });
  //   }
  //   useEffect(() => {}, [socket, users]);
  const handleSumbit = (e) => {
    e.preventDefault()
    console.log(message);
    socket.emit("message", message)
    setMessage("")
  }
  return (
    <div>
      <h2>Open chat</h2>
      <div>
        <h4>Active User </h4>
        <div>
          {users &&
            users.map((user) => <p key={user.user._id}>{`🟢 ${user.user.name}`}</p>)}
        </div>
      </div>
      <h3>Enviar mensaje</h3>
      <form onSubmit={(e) => handleSumbit(e)}>
      {/* <input type="text" id="textId" autoComplete="off" /> */}
      <input
        type="text"
        id="text-message"
        autoComplete="off"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>Send</button>
      </form> 
     
    </div>
  );
};

export default ChatBar;
