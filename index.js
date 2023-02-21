const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server);
const port = 3000;

app.use(express.static("public"));

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const clients = {};

io.on("connection", (socket) => {
  clients[socket.id] = { id: socket.id };
  console.log("connection");

  // Update
  socket.on("update", (targetSocketId, data) => {
    if (clients[targetSocketId]) {
      io.to(targetSocketId).emit("update", socket.id, data);
    }
  });

  socket.on("disconnect", () => {
    delete clients[socket.id];
  });
});

app.use(express.static("public"));
