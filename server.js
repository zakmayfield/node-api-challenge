// ------imports-----
const express = require('express');
const server = express();
const cors = require('cors');

const projectRouter = require('./data/helpers/projectRouter');
const actionRouter = require('./data/helpers/actionRouter');

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
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


server.get('/', logger, (req, res) => {
  res.send(`<h2>Server's up n' runnin'</h2>`);
})

//-----export-----
module.exports = server;