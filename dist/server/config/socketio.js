/**
 * Socket.io configuration
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (socketio, cache) {
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
    secret: _environment2.default.secrets.session,
    handshake: true
  }));

  socketio.on('connection', function (socket) {
    console.log('connection');
    socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function () {
      var _console;

      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['SocketIO ' + socket.nsp.name + ' [' + socket.address + ']'].concat(data));
    };

    socket.on('disconnect', function () {
      socket.log('DISCONNECTED');
    });
    socket.emit('updated-patients', cache.getCurrentPatients());
    socket.log('CONNECTED');
  });
};

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=socketio.js.map
