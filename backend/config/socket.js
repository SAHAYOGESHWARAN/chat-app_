const redis = require('redis');
const redisAdapter = require('socket.io-redis');

const socketConnection = (server) => {
  const io = require('socket.io')(server);
  io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
  // Continue with the socket connection logic
};

module.exports = socketConnection;
