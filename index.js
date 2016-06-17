var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(3000);
var io = socket.listen(server);

app.use(express.static('public', {
  'extensions': ['html']
}));

var bug = false;
var live = false;
var clock = false;
var ticker = {
  "show": false
};
var l3 = {
  "show": false
};
var l3list = {}

io.on('connect', function(socket) {
  console.log("Socket client connected");
  socket.emit('bug', bug);
  socket.emit('live', live);
  socket.emit('clock', clock);
  socket.emit('ticker', ticker);
  socket.emit('lowerThird', l3);
  socket.emit('l3list', l3list)
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
  socket.on('l3list', function(payload) {
    l3list = payload;
    io.emit('l3list', l3list)
    console.log(l3list)
  })

})

console.log("Listening on port 3000")
console.log("Admin at localhost:3000/admin")
