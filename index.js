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
var l3 = {"show": false};

io.on('connect', function(socket) {
  console.log("Socket client connected");
socket.emit('bug', bug);
socket.emit('live', live);
socket.emit('clock', clock);
socket.emit('ticker', ticker);
socket.emit('lowerthird', l3);

})
