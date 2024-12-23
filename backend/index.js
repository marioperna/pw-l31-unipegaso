const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { WEBSOCKET_CMD } = require('./websocket-cmd');
const CULTIVATION_INDICATORS = require('./cultivation-indicators');
const { getStatData } = require('./utilities');

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
const WEBSOCKET_SEND_INTERVAL = process.env.WEBSOCKET_SEND_INTERVAL || 4000;
const IO = new Server(server, {
  cors: {
    origin: getOrigin(),
  }
});


// GESTIONE WEBSOCKET
IO.on('connection', (socket) => {
  console.log('a user connected');

  socket.on(WEBSOCKET_CMD.LOOKING_CULTIVATION, (payload) => {
    const currentCultivation = JSON.parse(payload);

    const intervalId = setInterval(() => {
      const generatedData = getStatData(currentCultivation);
      console.log('generatedData:', generatedData);

      socket.emit(WEBSOCKET_CMD.STATS_DATA, generatedData);
    }, WEBSOCKET_SEND_INTERVAL);

    // Pulisci l'intervallo quando il client si disconnette
    socket.on('disconnect', () => {
      console.log('Il client si è disconnesso');
      clearInterval(intervalId);
    });
  });

});


// GESTIONE API
app.get('/api/indicatori-coltivazioni/:cultivationCode', (req, res) => {
  const { cultivationCode } = req.params;
  if(!cultivationCode) {
    return res.status(400).send('cultivationCode is required');
  }
  // send the json
  return res.json(CULTIVATION_INDICATORS[cultivationCode]);
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});