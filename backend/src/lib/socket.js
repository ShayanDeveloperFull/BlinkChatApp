import jwt from "jsonwebtoken";

const onlineUsers = {};

export const getRecieverSocketId = (userId) => {
  return onlineUsers[userId];
};

export default function setupSocket(io) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("No token provided"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;

      next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;

    console.log("User connected:", userId, "socket:", socket.id);

    onlineUsers[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));

    socket.on("disconnect", () => {
      delete onlineUsers[userId];

      console.log("User disconnected:", userId);
      console.log("Online Users:", onlineUsers);

      io.emit("onlineUsers", Object.keys(onlineUsers));
    });
  });
}
