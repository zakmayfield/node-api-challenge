// ------imports-----
const express = require('express');
const server = express();
const morgan = require('morgan');
const cors = require('cors');

//-----middleware------
server.use(express.json())
server.use(cors()); // use react app with server

//-----custom middleware-----
function logger(req, res, next) {
  console.log(
    `LOGGER: ${req.method} request to ${req.originalUrl} at ${new Date().toISOString()}`
  )
  next()
}

//-----routes-----

server.get('/', logger, (req, res) => {
  res.send(`<h2>Server's up n' runnin'</h2>`);
})

//-----export-----
module.exports = server;