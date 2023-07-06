const {
  createChatMessage,
  getterUsers,
  setterUsers,
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

  //Agrega al usuario conectado
  // chat.userConnect(user);
  // const arrayUsers = chat.usersArray();

  socket.on("New-User", (data) => {
    pushUsers(data);
    io.emit("active-users", getterUsers());
  });

  //Limpiar cuando alguien se desconecta
  socket.on("disconnect", () => {
    chat.userDisconnect(user.id);
  });

  console.log(`⚡️ ${socket.id} user just connected! 🎃`);

  socket.on("disconnect", () => {
    console.log("A user disconnected 💥");
  });
};

module.exports = { socketController };
