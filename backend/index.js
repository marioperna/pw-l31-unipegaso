const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { WEBSOCKET_CMD } = require('./websocket-cmd');

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

const PORT = process.env.PORT || 3000;
const WEBSOCKET_SEND_INTERVAL = process.env.WEBSOCKET_SEND_INTERVAL || 5000;
const IO = new Server(server, {
  cors: {
    origin: getOrigin(),
  }
});

IO.on('connection', (socket) => {
  console.log('a user connected');

  setInterval(() => {
    socket.emit(WEBSOCKET_CMD.TEMPERATURE, 'Hello from server');
  }, WEBSOCKET_SEND_INTERVAL);
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});