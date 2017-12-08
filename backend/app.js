const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIo = require('socket.io');

const http = require('http');
const app = express();
const port = 6200;

const currencyRoutes = require('./routes/CurrencyRoutes');
const apiPath = '/api';

// Connect to MongoDB
mongoose.connect('mongodb://mongodb').then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB error: ', err.stack);
  process.exit(1);
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(apiPath, currencyRoutes);

const server = http.createServer(app);

// Socket.io connection and listener
const io = socketIo(server);
const POLYGON_API = process.env.POLYGON_SECRET;

io.on('connection', socket => {
  console.log('New client connected'),
  setInterval(() => sockConnect(socket), 2000);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Get latest Bid/Ask quote from Polygon.io and emit to 'rate stream' channel
const sockConnect = async socket => {
  try {
    const response = await axios.get('https://api.polygon.io/v1/last_quote/currencies/EUR/USD?apiKey=' + POLYGON_API);
    socket.emit('rate stream', response.data);

  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => {
  console.log('Backend running on port: ', port);
});
