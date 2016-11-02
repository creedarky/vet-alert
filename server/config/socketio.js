/**
 * Socket.io configuration
 */
'use strict';

// import config from './environment';
const SerialPort = require('serialport');
const sp = new SerialPort('/dev/tty.usbmodem1421', {
  baudrate: 9600,
  parser: SerialPort.parsers.readline('\n')
}, e => console.log(e));

sp.on('open', function() {
  console.log('open');
});
// When the user disconnects.. perform this
function onDisconnect(/*socket*/) {}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });
  sp.on('data', function(data) {
    console.log(data);
    const values = data.split(';');
    socket.emit('data', {
      temp: parseFloat(values[0]),
      envTemp: parseFloat(values[1]),
      pressure: parseFloat(values[2]),
      heartRate: parseFloat(values[3])
    });
    // socket.emit('data', {
    //   temperature: temp
    // })
  });
  // Insert sockets below
  // require('../api/ciudad/ciudad.socket').register(socket);
  // require('../api/rol/rol.socket').register(socket);
  // require('../api/permiso/permiso.socket').register(socket);
  // require('../api/paciente/paciente.socket').register(socket);
  // require('../api/monitoreo-paciente/monitoreo-paciente.socket').register(socket);
  // require('../api/log/log.socket').register(socket);
  // require('../api/evento/evento.socket').register(socket);
  // require('../api/estado/estado.socket').register(socket);
  // require('../api/especie/especie.socket').register(socket);
  // require('../api/comuna/comuna.socket').register(socket);
  // require('../api/apoderado/apoderado.socket').register(socket);
  // require('../api/thing/thing.socket').register(socket);
}

export default function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

    socket.connectedAt = new Date();

    socket.log = function(...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
}
