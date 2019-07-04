module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log("connection");
    socket.on('message', function(message) {
      socket.emit('incommingMessage',message.value);
      console.log('from console',message.value);
    });
    socket.on('attack', function(message) {
      console.log(`opponent ${message.opponent} was attacked`);
      socket.broadcast.emit('attack', message);
    });
  });
};
