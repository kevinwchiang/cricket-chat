const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const http = require('http');
const WebSocket = require('ws');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.get('/', function(req, res) {
  res.send('Success!')
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(message) {
    if (message === 'initial') {
      ws.send('Initial Data')
    } else {
      ws.send(message)
    }
    console.log('received: %s', message);
  });

  ws.send('Connection completed');
});

server.listen(8081, function listening() {
  console.log('Listening on %d', server.address().port);
});