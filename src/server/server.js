const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const sequelize = require('./sequelize');
const models = require('./models');

const { Message } = models;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Connect to DB
sequelize.authenticate();

app.get('/', (req, res) => {
  res.send('Success!');
});

// Create websocket connection
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast to all connected clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const handleMessage = (ws, message) => {
  if (message === 'initial') {
    Message.findAll({ order: [['createdAt', 'ASC']] }).then((data) => {
      ws.send(JSON.stringify(data));
    });
  } else {
    const newMessage = Message.build({ text: message });
    newMessage.save().then(() => {
      Message.findAll({ order: [['createdAt', 'ASC']] }).then((data) => {
        wss.broadcast(JSON.stringify(data));
      });
    });
  }
};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    handleMessage(ws, message);
  });

  ws.send('Connection completed');
});

server.listen(8081, () => {
  console.log('Listening on %d', server.address().port);
});
