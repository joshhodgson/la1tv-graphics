var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(3000);
var io = socket.listen(server);

app.use(express.static('public'));

var bug = false;
var live = false;
var clock = false;
var ticker = false;
var l3 = {
  "show": false
};

io.on('connect', function(socket) {
  console.log("Socket client connected");
  socket.emit('bug', bug);
  socket.emit('live', live);
  socket.emit('clock', clock);
  socket.emit('ticker', ticker);
  socket.emit('lowerThird', l3);
  socket.on('bug', function(payload) {
    bug = payload;
    io.emit('bug', payload)
  })
  socket.on('live', function(payload) {
    live = payload;
    io.emit('live', payload)
  })
  socket.on('clock', function(payload) {
    clock = payload;
    io.emit('clock', payload)
  })
  socket.on('ticker', function(payload) {
    ticker = payload;
    io.emit('ticker', payload)
  })
  socket.on('lowerThird', function(payload) {
    l3 = payload;
    io.emit('lowerThird', payload)
  })

})
