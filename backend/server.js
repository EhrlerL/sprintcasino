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
    // assign Admin to the first player
    const isFirstPlayer = Object.keys(lobby.players).length === 0;
    lobby.players[socket.id] = { name, vote: null, isAdmin: isFirstPlayer };
    io.emit('lobbyUpdate', lobby);
    console.log(`Player joined: ${name}, Admin: ${isFirstPlayer}`);
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
    const wasAdmin = lobby.players[socket.id]?.isAdmin;
    delete lobby.players[socket.id];

    // Reassign Admin if the admin disconnects
    if (wasAdmin && Object.keys(lobby.players).length > 0) {
      const newAdminId = Object.keys(lobby.players)[0];
      lobby.players[newAdminId].isAdmin = true;
      console.log(`New Admin assigned: ${lobby.players[newAdminId].name}`);
    }
    
    io.emit('lobbyUpdate', lobby);
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});