
const { Server } = require("socket.io");
const config = require("./appConfig");
const registerSockets = require("../sockets"); 

module.exports = (server) => {
  const io = new Server(server, {
    cors: config.cors,
  });

  registerSockets(io); 

  return io;
};
