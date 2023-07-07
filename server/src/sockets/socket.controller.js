const {
  createChatMessage,
  getterUsers,
  deleteUser,
  pushUsers,
} = require("../api/controllers/chat-message");
const { verifySocketToken } = require("../utils/token");

const socketController = async (socket, io) => {
  try {
    const token = socket.handshake.headers["x-token"];

    const user = await verifySocketToken(token);

    if (!user) {
      return socket.disconnect();
    }

    // const chat = createChatMessage();

    //Gestionamos conexion de usuarios
    socket.on("New-User", (data) => {
      pushUsers(data);
      console.log("DAAATAA", data);
      const users = getterUsers();
      io.emit("active-users", users);
    });

    //Limpiar cuando alguien se desconecta
    socket.on("disconnect", () => {
      // deleteUser(user);
      // const users = getterUsers();
      // console.log("UUUSSSEEERRRSSSSSS", users);
      // io.emit("disconnect-user", users);
      console.log("A user disconnected 💥");
    });

    console.log(`⚡️ ${socket.id} user just connected! 🎃`);
  } catch (error) {
    console.error("Error during socket connection", error);
  }
};

module.exports = { socketController };
