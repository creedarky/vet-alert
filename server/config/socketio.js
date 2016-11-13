/**
 * Socket.io configuration
 */
'use strict';

import config from './environment';




// When the user connects.. perform this

export default function(socketio, cache) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  socketio.use(require('socketio-jwt').authorize({
    secret: config.secrets.session,
    handshake: true
  }));

  socketio.on('connection', function(socket) {
    console.log('connection');
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    socket.on('disconnect', () => {
      socket.log('DISCONNECTED');
    });
    socket.emit('updated-patients', cache.getCurrentPatients());
    socket.log('CONNECTED');
  });
}
