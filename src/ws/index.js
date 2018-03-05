const socketIO = require('socket.io');

let io = null;

module.exports = async http => {
  global.io = io = socketIO(http);

  io.on('connection', socket => {
    socket.on('handshaking', async ({ id, user }) => {
      if(!id) {
        console.log(`id not existed`);
        return;
      };
      socket.join(id, () => {
        console.log(`socket user ${id} established`)
      })
    });
    socket.on('disconnect', () => {
      console.log(`disconnect`);
    });
  });
  return io;
};