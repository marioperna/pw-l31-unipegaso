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
    return '*';
  }
}

const PORT = process.env.PORT || 3000;
const WEBSOCKET_SEND_INTERVAL = process.env.WEBSOCKET_SEND_INTERVAL || 2000;
const IO = new Server(server, {
  cors: {
    origin: getOrigin(),
  }
});


// GESTIONE WEBSOCKET
IO.on('connection', (socket) => {
  console.log('User connected to the socket');
  let intervalId = null;

  socket.on(WEBSOCKET_CMD.LOOKING_CULTIVATION, (payload) => {
    const currentCultivation = JSON.parse(payload);

    // pulisco l'intervallo ogni volta che cambia il selettore della coltivazione
    if(intervalId){
      console.log("cleaning interval");
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      const statData = getStatData(currentCultivation);
      console.log('statData:', statData);

      socket.emit(WEBSOCKET_CMD.GET_CLIMATIC_DATA, statData.climatic);
      socket.emit(WEBSOCKET_CMD.GET_PRODUCTION_DATA, statData.production);
      socket.emit(WEBSOCKET_CMD.GET_BUSINESS_DATA, statData.businiess);
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