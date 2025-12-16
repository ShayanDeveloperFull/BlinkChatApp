import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"


import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import setupSocket from "./lib/socket.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

const PORT = process.env.PORT

//Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(cors({
  origin: "https://blinkchat-hymo.onrender.com",
  credentials: true
}
))

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

//Creating http server
const server = http.createServer(app);

//Creating Socket.io server
const io = new Server(server, {
  cors: {
    origin: "https://blinkchat-hymo.onrender.com",
    credentials: true
  }
});

// Exposing io to controllers safely (no exports, no circular imports)
app.set("io", io);

//Setup Socket Events
setupSocket(io)

server.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
})

