const {
  createChatMessage,
  getterUsers,
  deleteUser,
  pushUsers,
  sendMessage,
  last10Messages,
} = require("../api/controllers/usersConnected");
const { verifySocketToken } = require("../utils/token");

const socketController = async (socket, io) => {
  try {
    const token = socket.handshake.headers["x-token"];

    const user = await verifySocketToken(token);

    if (!user) {
      return socket.disconnect();
    }

    //Gestionamos conexion de usuarios
    socket.on("New-User", (data) => {
      pushUsers(data);
      const users = getterUsers();
      io.emit("active-users", users);
    });

    //Conectar a una sala privada mediante el user._id
    socket.join(user._id);

    // Recibimos señal de que se ha creado un chat para actualizar navChat del otro User
    socket.on("new-chat", () => {
      console.log("Llega nuevo mensaje");
      io.emit("update-chatBar");
    });

    //Recibimos emisión de mensaje
    socket.on("send-message", ({ id, message }) => {
      console.log(message);
      //Si viene id es un mensaje privado
      if (id) {
        console.log(id);
        io.emit("get-private-message", message);
      } else {
        // sendMessage(user._id, user.name, message);
        //Emitimos mensaje
        io.emit("get-message", message);
      }
    });

    //Limpiar cuando alguien se desconecta
    socket.on("disconnect-user", () => {
      deleteUser(user);
      const users = getterUsers();
      io.emit("disconnected-user", users);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected 💥");
    });

    console.log(`⚡️ ${socket.id} user just connected! 🎃`);
  } catch (error) {
    console.error("Error while socket try connection", error);
  }
};

module.exports = { socketController };
