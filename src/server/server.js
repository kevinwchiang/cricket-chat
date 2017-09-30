const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const http = require('http');
const WebSocket = require('ws');
const { sequelize, Message } = require('./sequelize');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

// Connect to DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', function(req, res) {
  res.send('Success!')
});

// Create websocket connection
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast to all connected clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

const handleMessage = function(ws, message) {
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
    })
  }
}

wss.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(message) {
    handleMessage(ws, message);
  });

  ws.send('Connection completed');
});

server.listen(8081, function listening() {
  console.log('Listening on %d', server.address().port);
});