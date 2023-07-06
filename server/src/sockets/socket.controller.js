const {
  createChatMessage,
  getterUsers,
  deleteUser,
  pushUsers,
} = require("../api/controllers/chat-message");
const { verifySocketToken } = require("../utils/token");

const socketController = async (socket, io) => {
  const token = socket.handshake.headers["x-token"];

  const user = await verifySocketToken(token);

  if (!user) {
    return socket.disconnect();
  }

  const chat = createChatMessage();

  //Gestionamos conexion de usuarios
  socket.on("New-User", (data) => {
    pushUsers(data);
    io.emit("active-users", getterUsers());
  });

  //Limpiar cuando alguien se desconecta
  socket.on("disconnect", () => {
    deleteUser(user);
    console.log("A user disconnected 💥");
  });

  console.log(`⚡️ ${socket.id} user just connected! 🎃`);
};

module.exports = { socketController };
