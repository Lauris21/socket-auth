const { verifySocketToken } = require("../utils/token");

const socketController = async (socket) => {
  const token = socket.handshake.headers["x-token"];

  const user = await verifySocketToken(token);

  if (!user) {
    return socket.disconnect();
  }
  console.log(`⚡️ ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("A user disconnected 💥");
  });
};

module.exports = { socketController };
