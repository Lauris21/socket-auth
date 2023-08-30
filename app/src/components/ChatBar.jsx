import { useEffect, useState } from "react";
import { useAuth } from "../context/userContext";
import ModalNewChat from "./ModalNewChat";
import { getChatUser } from "../services/API_Chat/user.service";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [meChats, setMeChats] = useState([]);
  const [chatCreated, setChatCreated] = useState(false);
  const { user, newChat, setShowChat } = useAuth();

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
      const chats = await getChatUser();
      setMeChats(await chats.data);
    };
    getChats();
  }, [newChat, chatCreated]);

  useEffect(() => {
    socket.on("update-chatBar", () => {
      Swal.fire({
        icon: "success",
        title: "Has been invited to Chat 💬",
        showConfirmButton: false,
        timer: 1200,
      });
      setChatCreated(true);
    });
    return () => {
      setChatCreated(false);
    };
  }, []);

  return (
    <div className="flex flex-col w-[85%] items-center gap-5 p-5">
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
      <ModalNewChat socket={socket} />
      <div className="flex flex-col items-center">
        <p className="p-2">CHATS</p>
        {meChats &&
          meChats.map((item, i) => (
            <p
              className="hover:text-lg hover:bg-darkBlue cursor-pointer p-2 rounded"
              key={i}
              onClick={() => setShowChat(() => item._id)}
            >
              {item.userInit?.name ? item.userInit?.name : item.userTwo.name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default ChatBar;
