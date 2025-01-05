const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  methods: ['GET','POST'],
  credentials: true
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});


io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);

  socket.on('my_event', (data) => {
    console.log('Received my_event:', data);
    socket.emit('my_response', `Echo: ${data}`);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected: ${socket.id} - ${reason}`);
  });
});

server.listen(8080, () => {
  console.log('Socket.IO server listening on port 8080');
});
