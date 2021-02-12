const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

const { addUser, removeUser, fetchUser } = require("./utility/users");

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.emit("getID", { id: socket.id });
    socket.join(room);

    callback();
  });

  socket.on("greeting", (id) => {
    const user = fetchUser(id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        message: `Welcome to ${user.room}, ${user.name}`,
      });
    }
  });

  socket.on("sendMessage", (message, callback) => {
    const user = fetchUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: user.name, message: message });
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        message: `${user.name} has left the chat`,
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("hey");
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
