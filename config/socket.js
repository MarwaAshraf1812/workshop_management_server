const socketIO = require('socket.io');

let io;

module.exports = {

  /**
   * Initializes the socket.io server.
   * @param {http.Server} server - The HTTP server to attach the socket.io server to.
   * @returns {socket.Server} The socket.io server object.
   */
  init: (server) => {
    io = socketIO(server, {
      cors: {
        origin: ["*",'http://localhost:5173','http://localhost:3000',"https://client-ruddy-iota-11.vercel.app"],
        methods: ["GET", "POST"]
      }
    });
    return io;
  },

  /**
   * Returns the socket.io server object.
   * @throws {Error} If the socket.io server has not been initialized.
   * @returns {socket.Server} The socket.io server object.
   */
  getIo: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};