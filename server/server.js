const express = require("express");
const http = require("http");
const cors = require("cors");
const { userJoin, getUsers, userLeave } = require("./utils/user");

const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");

// const FRONTEND_URL = process.env.FRONTEND_URL;
const FRONTEND_URL = "http://localhost:3000";

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const io = socketIO(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.send("server is running");
});

// socket.io
let imageUrl, userRoom;
io.on("connection", (socket) => {
  socket.on("user-joined", (data) => {
    const { roomId, userId, userName, host, presenter } = data;
    userRoom = roomId;
    const user = userJoin(socket.id, userName, roomId, host, presenter);
    const roomUsers = getUsers(user.room);
    socket.join(user.room);
    socket.emit("message", { message: "Welcome to ChatRoom" });
    socket.broadcast.to(user.room).emit("message", { message: `${user.username} has joined` });

    io.to(user.room).emit("users", roomUsers);
    io.to(user.room).emit("canvasImage", imageUrl);
  });

  socket.on("drawing", (data) => {
    imageUrl = data;
    socket.broadcast.to(userRoom).emit("canvasImage", imageUrl);
  });

  socket.on('chat-message', (message) => {
     socket.broadcast.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", { message: `${userLeaves.username} left the chat` });
      io.to(userLeaves.room).emit("users", roomUsers);
    }
  });
});

// serve on port
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
