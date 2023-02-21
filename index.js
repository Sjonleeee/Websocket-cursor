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

io.on('connection', (socket) => {
  console.log('connection');

  clients[socket.id] = {
    id: socket.id,
    x: Math.random(),
    y: Math.random(),
  };

  // Update
  socket.on('update', (targetSocketId, data) => {
    if (clients[targetSocketId]) {
      socket.io(targetSocketId.emit('update', socket.id, data));
    }
  });

  socket.on("disconnect", () => {
    delete clients[socket.id];
  });
});


