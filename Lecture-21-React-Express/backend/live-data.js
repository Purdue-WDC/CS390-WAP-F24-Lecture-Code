// Lecture 22 Code (Live Data)
// Here, I show an example of a live counter.

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { WebSocketServer, WebSocket } = require('ws');

// GLOBAL DATA

let count = 0;

// INIT WEBSOCKET SERVER

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (client) => {
  // just so we know when a client connects
  console.log("a client connected...");

  // send client current count
  const body = {count};
  const bodyString = JSON.stringify(body);
  client.send(bodyString);
});

// INIT EXPRESS SERVER

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/increment", (req, res, next) => {
  count++;

  // turn data we want to send to each client into a JSON string.
  const body = {count};
  const bodyString = JSON.stringify(body);

  // propagate update to all connected clients
  wss.clients.forEach(client => {
    console.log("sending to client")
    if (client.readyState === WebSocket.OPEN) {
      client.send(bodyString);
    }
  })

  res.status(200).json(body);
});

const EXPRESS_PORT = 3000;
app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});