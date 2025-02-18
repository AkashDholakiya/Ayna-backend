'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const { Server } = require('socket.io');
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true,
      },
    });

    io.on('connection', (socket) => {

      socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
      });

      socket.on('sendMsg', ({ roomId, message }) => {
        const ans = {
          id: new Date().getTime(),
          uid: socket.id,
          msg: message.msg,
          role: 'server',
        };

        io.to(roomId).emit('recvMsg', ans);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  },
};
