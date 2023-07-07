import socketIo from "socket.io-client";

export const useSocket = (url, token, userData, resOk) => {
  if (resOk) {
    try {
      let socket;
      const user = userData;
      const socketConnect = socketIo.connect(url, {
        extraHeaders: {
          "x-token": token,
        },
      });

      socketConnect.on("connect", () => {
        socketConnect.emit("New-User", { user, socketId: socketConnect.id });
        console.log("Socket online");
      });

      socketConnect.on("disconnect", () => {
        console.log("Socket offline 💥");
      });

      // socketConnect.on("send-message", () => {
      //   console.log("Socket online");
      // });

      // socketConnect.on("private-message", () => {
      //   console.log("Socket online");
      // });

      socket = socketConnect;
      return socket;
    } catch (error) {
      return error;
    }
  }
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {

  //   return () => {
  //     socketConnect.close();
  //   };
  // }, [url, token, userData]);
};
