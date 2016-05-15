var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(3000);
var io = socket.listen(server);

app.use(express.static('public'));

io.on('connect', function(socket) {
  console.log("Socket client connected");

})
