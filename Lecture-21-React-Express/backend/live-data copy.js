// Lecture 22: Live

// Because this app is not ran in the browser, we need to use CommonJS (Node.js) syntax.
// For imports, this means using require instead of import.
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { WebSocketServer, WebSocket } = require('ws');

// GLOBAL DATA

let count = 0;

const user_data = {
  "arnav": {
    password: "123"
  },
  "bob": {
    password: "321"
  }
};

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

  const body = {count};
  const bodyString = JSON.stringify(body);

  // propagate count update to all connected clients
  wss.clients.forEach(client => {
    console.log("sending to client")
    if (client.readyState === WebSocket.OPEN) {
      client.send(bodyString);
    }
  })

  res.status(200).json(body);
});

// app.post('/login', (req, res) => {
//   console.log(req.body);
//   const { username, password } = req.body;
//   console.log(user_data[username])
//   console.log(password)
//   if (!user_data[username] || user_data[username].password !== password) {
//     res.sendStatus(401);
//     res.send("You are not authorized.");
//   } else {
//     res.sendStatus(200);
//     res.json(user_data[username]);
//   }
// });

// const protected_router = express.Router('/account');

// protected_router.use((req, res, next) => {
//   if (security_info_not_valid) {
//     res.status(401).send("Not authorized")
//     return;
//   } else {
//     next();
//   }
// });

// // request: POST /account/edit-account

// protected_router.post('/edit-account', (req, res) => {
//   // some logic
// });

// protected_router.post('/delete-account', (req, res) => {
//   // some logic
// });


// app.use(protected_router);

const EXPRESS_PORT = 3000;
app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
});