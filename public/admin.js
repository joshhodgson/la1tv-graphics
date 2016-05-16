var socket = io.connect('http://' + window.location.host);

socket.on('connect', function(socket) {
  console.log("Connected!")
})
