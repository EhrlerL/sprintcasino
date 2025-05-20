const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let lobby = {
  players: {},
  revealed: false
};

io.on('connection', socket => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('join', name => {
    lobby.players[socket.id] = { id: socket.id, name, vote: null };
    io.emit('lobbyUpdate', lobby);
    console.log(`Player joined: ${name}`);
  });

  socket.on('vote', vote => {
    if (lobby.players[socket.id]) {
      lobby.players[socket.id].vote = vote;
      io.emit('lobbyUpdate', lobby);
      console.log(`Player ${lobby.players[socket.id].name} voted: ${vote}`);
    }
  });

  socket.on('reveal', () => {
    lobby.revealed = true;
    io.emit('lobbyUpdate', lobby);
    console.log('Votes revealed');
  });

  socket.on('reset', () => {
    Object.values(lobby.players).forEach(p => p.vote = null);
    lobby.revealed = false;
    io.emit('lobbyUpdate', lobby);
    console.log('Lobby reset');
  });

  socket.on('disconnect', () => {
    delete lobby.players[socket.id];
    io.emit('lobbyUpdate', lobby);
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});