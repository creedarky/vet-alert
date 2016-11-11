/**
 * Socket.io configuration
 */
'use strict';
import {Monitor} from '../sqldb';

// import config from './environment';
const SerialPort = require('serialport');
const ArduinoScanner = require('../scanner');
var arduinoScanner = new ArduinoScanner({
  // board: 'mega',
  // serialNumber: 'AL009RD3',
  // port: '/dev/cu.usbserial-AL009RD3'
});
console.log('inicia arduino scanner');
arduinoScanner.start(10000);
const isWin = os.platform() === 'win32';
const prefix = isWin ? '\\\\.\\' : '';


// const ArduinoScanner = require('arduino-scanner');
// const arduinoScanner = new ArduinoScanner({
//   debug: true
// });
//
// arduinoScanner.start(200);
// console.log('arduinoStart');
const sp = {};
let monitorData = {};

const monitoresActivos = {};
arduinoScanner.on('arduinoFound', function(response) {
  console.log('arduinoFound');
  arduinoScanner.stop();
  if (sp[response.serialNumber]) {
    return;
  }
  // connectToArduino(response.port);
  sp[response.serialNumber] = new SerialPort(`${prefix}${response.port}`, {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\n')
  }, e => console.log(e));

  sp[response.serialNumber].on('open', function() {
    console.log('open');
  });
  sp[response.serialNumber].on('data', function(data) {
    console.log(data);
    let parsedData = null;
    try {
      parsedData = JSON.parse(data);
    } catch(e) {
      return;
    }
    if (monitoresActivos[parsedData.idMonitor]) {
      return;
    }
    monitoresActivos[parsedData.idMonitor] = parsedData.idMonitor;
    Monitor.upsert(
      {
        id: parsedData.idMonitor,
        activo: true
      }
    );
  });
});


// When the user disconnects.. perform this
function onDisconnect(/*socket*/) {}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log(JSON.stringify(data, null, 2));
  });
  Object.keys(sp).forEach(key => {
    sp[key].on('data', function(data) {
      // console.log(data);
      try {
        const parsedData = JSON.parse(data);
        socket.emit('data', parsedData);
        if (parsedData.tipo !== 'estado') {
          return;
        }
        if (monitorData[parsedData.idMonitor]) {
          monitorData[parsedData.idMonitor].push(parsedData);
        } else {
          monitorData[parsedData.idMonitor] = [parsedData];
        }
      } catch(e) {} // eslint-disable-line
    });
  });
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
    console.log('connection');
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
