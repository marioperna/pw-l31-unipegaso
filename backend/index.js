const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

getOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.FRONTEND_URL) {
      return process.env.FRONTEND_URL
    }
    throw new Error('FRONTEND_URL is not set');
  } else {
    return 'http://localhost:5173';
  }
}

const io = new Server(server, {
  cors: {
    origin: getOrigin(),
  }
});
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});