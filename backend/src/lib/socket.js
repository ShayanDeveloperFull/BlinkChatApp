const onlineUsers = {}

export const getRecieverSocketId = (userId) => {
  return onlineUsers[userId];
}

export default function setupSocket(io) {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    console.log("User connected:", userId, "socket:", socket.id);

    if (userId) {
      onlineUsers[userId] = socket.id
      console.log(onlineUsers);
    }

    io.emit("onlineUsers", Object.keys(onlineUsers));

    socket.on("disconnect", () => {

      for (const x in onlineUsers) {
        if (onlineUsers[x] === socket.id) {
          delete onlineUsers[x];
          break;
        }
      }

      console.log("A user disconnected", socket.id);
      console.log("Online Users:", onlineUsers);

      io.emit("onlineUsers", Object.keys(onlineUsers));
    });
  });
}