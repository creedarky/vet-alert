'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = function (socketio, cache) {
  var arduinoScanner = new _scanner2.default();
  console.log('inicia arduino scanner');
  arduinoScanner.start(10000);
  var isWin = _os2.default.platform() === 'win32';
  var prefix = isWin ? '\\\\.\\' : '';
  var pacientes = cache.getCurrentPatients();
  var sp = {}; //Serial port
  var monitorData = {};
  var monitoresActivos = {};
  cache.emitter.on('update-patients', function (pacientesActualizados) {
    // console.log('pacientes actualizados????/????')
    pacientes = pacientesActualizados;
    pacientes.forEach(function (p) {
      var currentMonitor = monitorData[p.monitor.id];
      if (currentMonitor && currentMonitor.paciente.id !== p.id) {
        monitorData[p.monitor.id] = null;
      }
    });
    socketio.sockets.emit('updated-patients', pacientesActualizados);
  });

  var createMonitor = function createMonitor(idMonitor) {
    if (monitoresActivos[idMonitor]) {
      return;
    }
    _sqldb.Monitor.upsert({
      id: idMonitor,
      activo: true
    });
    monitoresActivos[idMonitor] = idMonitor;
  };

  var addData = function addData(data) {
    if (data.tipo !== 'estado') {
      socketio.sockets.emit('data', data);
      return;
    }
    var monitor = getMonitor(data);
    var paciente = monitor.paciente;

    var status = calcularStatus(monitor, paciente.especie);

    var estado = ESTADOS.OK;

    if (status.margen > MIN_DANGER) {
      // TODO definir el porcentaje
      estado = ESTADOS.DANGER;
    } else if (status.margen > MIN_WARNING) {
      estado = ESTADOS.WARNING;
    }

    monitor.estado = estado;
    data.estado = estado;
    var mensajes = getMensaje(status);
    if (mensajes.length) {
      var alerta = monitor.alerta || {};
      var actualizarAlerta = (0, _isNil2.default)(alerta.fecha) || (0, _moment2.default)().diff((0, _moment2.default)(alerta.fecha), 'minutes') >= 5 || estado !== alerta.tipo && estado === ESTADOS.DANGER;
      var fecha = new Date();
      monitor.alerta = actualizarAlerta ? {
        id: '' + monitor.id + monitor.paciente.id + fecha.getTime(),
        fecha: fecha,
        mensajes: mensajes,
        tipo: estado
      } : alerta;
      setMonitor(monitor);
      // TODO aca deberia mandar notificacion
    }
    data.alerta = monitor.alerta;
    data.idPaciente = paciente.id;
    data.promedioTemp = monitor.promedioTemp;
    data.promedioPpm = monitor.promedioPpm;
    // console.log('to emit', data);
    socketio.sockets.emit('data', data);
  };

  var getMonitor = function getMonitor(data) {
    var monitor = void 0;
    if (monitorData[data.idMonitor]) {
      monitor = monitorData[data.idMonitor];
    } else {
      var paciente = pacientes.find(function (p) {
        return p.monitor.id === data.idMonitor;
      });
      monitorData[data.idMonitor] = {
        id: data.idMonitor,
        paciente: paciente,
        latidos: [],
        temperaturas: [],
        promedioTemp: 0,
        promedioPpm: 0,
        latido: null,
        temperatura: null,
        movimiento: null
      };

      monitor = monitorData[data.idMonitor];
    }

    if (data.latidos) {
      monitor.latidos.push(data.latidos);
      monitor.latido = data.latidos;
    } else if (data.temperatura) {
      monitor.temperaturas.push(data.temperatura);
      monitor.temperatura = data.temperatura;
      monitor.movimiento = data.movimiento;
    }

    if (monitor.latidos.length >= MAX_LENGTH || monitor.temperaturas.length >= MAX_LENGTH) {
      var promedios = calcularPromedio(monitor.latidos, monitor.temperaturas);
      monitor = (0, _assign2.default)({}, monitor, promedios);
      monitor.latidos = [];
      monitor.temperaturas = [];

      _sqldb.MonitoreoPaciente.create({
        promedioTemperatura: promedios.promedioTemp,
        promedioPpm: promedios.promedioPpm,
        estadoMovimiento: monitor.movimiento,
        estadoTemperatura: monitor.temperatura,
        estadoPaciente: monitor.estado,
        estadoPpm: monitor.latido,
        id_paciente: monitor.paciente.id
      });
    }

    setMonitor(monitor);

    return monitor;
  };

  var setMonitor = function setMonitor(monitor) {
    monitorData[monitor.id] = monitor;
  };

  var calcularPromedio = function calcularPromedio(latidos, temperaturas) {
    var totalLatidos = latidos.reduce(function (a, b) {
      return a + b;
    }, 0);
    var totalTemperatura = temperaturas.reduce(function (a, b) {
      return a + b;
    }, 0);

    return {
      promedioTemp: totalTemperatura / temperaturas.length,
      promedioPpm: totalLatidos / latidos.length
    };
  };

  var calcularStatus = function calcularStatus(monitor, especie) {
    var temperatura = monitor.temperatura;
    var latido = monitor.latido;
    var maxTemp = especie.maxTemp;
    var minTemp = especie.minTemp;
    var maxPpm = especie.maxPpm;
    var minPpm = especie.minPpm;

    var porcentajeTemperatura = 0;
    var porcentajeLatidos = 0;
    if (temperatura > maxTemp) {
      porcentajeTemperatura = temperatura * 100 / maxTemp - 100;
    } else if (temperatura < minTemp) {
      porcentajeTemperatura = temperatura * 100 / minTemp - 100;
    }

    if (latido > maxPpm) {
      porcentajeLatidos = latido * 100 / maxPpm - 100;
    } else if (latido < minPpm) {
      porcentajeLatidos = latido * 100 / minPpm - 100;
    }
    return {
      porcentajeLatidos: porcentajeLatidos,
      porcentajeTemperatura: porcentajeTemperatura,
      margen: Math.abs(porcentajeLatidos) + Math.abs(porcentajeTemperatura)
    };
  };

  var getMensaje = function getMensaje(status) {
    var mensajes = [];
    if (status.porcentajeLatidos !== 0) {
      var mensaje = status.porcentajeLatidos > 0 ? 'Ritmo cardiaco elevado' : 'Ritmo cardiaco bajo';
      mensajes.push(mensaje);
    }
    if (status.porcentajeTemperatura !== 0) {
      var _mensaje = status.porcentajeTemperatura > 0 ? 'Temperatura del paciente elevada' : 'Temperatura del paciente baja';
      mensajes.push(_mensaje);
    }
    return mensajes;
  };

  arduinoScanner.on('arduinoFound', function (response) {
    // arduinoScanner.stop();
    if (sp[response.serialNumber]) {
      return;
    }
    // connectToArduino(response.port);
    sp[response.serialNumber] = new _serialport2.default('' + prefix + response.port, {
      baudrate: 115200,
      parser: _serialport2.default.parsers.readline('\n')
    }, function (e) {
      return console.log(e);
    });

    sp[response.serialNumber].on('open', function () {
      console.log('open');
    });
    sp[response.serialNumber].on('data', function (data) {
      // console.log(data);
      var parsedData = null;
      try {
        parsedData = JSON.parse(data);
        createMonitor(parsedData.idMonitor);
        addData(parsedData);
      } catch (e) {
        console.log(e);
      }
    });
  });
};

var _serialport = require('serialport');

var _serialport2 = _interopRequireDefault(_serialport);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _sqldb = require('../sqldb');

var _scanner = require('../scanner');

var _scanner2 = _interopRequireDefault(_scanner);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIN_WARNING = 0;
var MIN_DANGER = 1;
var MAX_LENGTH = 250;
var ESTADOS = {
  OK: 'ok',
  WARNING: 'warning',
  DANGER: 'danger'
};
//# sourceMappingURL=arduino.js.map
