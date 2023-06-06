const socketController = (socket) => {
  console.log(`⚡️ ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("A user disconnected 💥");
  });
};

module.exports = { socketController };
