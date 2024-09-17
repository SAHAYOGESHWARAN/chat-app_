const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('joinRoom', ({ chatId }) => {
      socket.join(chatId);
    });

    socket.on('sendMessage', (message) => {
      io.to(message.chatId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
