// ------imports-----
const express = require('express');
const server = express();
const morgan = require('morgan');
const cors = require('cors');

//-----middleware------
server.use(express.json())
server.use(morgan()); // logger
server.use(cors()); // use react app with server

//-----routes-----

server.get('/', (req, res) => {
  res.send(`<h2>Server's up n' runnin'</h2>`);
})

//-----export-----
module.exports = server;