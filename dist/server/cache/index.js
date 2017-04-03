'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var emitter = new _events.EventEmitter();
var currentData = {};
var getCurrentPatients = function getCurrentPatients() {
  return currentData;
};

var setCurrentPatients = function setCurrentPatients(data) {
  currentData = data;
  emitter.emit('update-patients', data);
};

var setPatient = function setPatient(data) {
  var index = currentData.findIndex(function (d) {
    return d.monitor.idMonitor === data.monitor.idMonitor;
  });
  if (index < 0) {
    return;
  }
  currentData[index] = data;
  emitter.emit('update-patients', currentData);
};

exports.default = {
  emitter: emitter,
  getCurrentPatients: getCurrentPatients,
  setCurrentPatients: setCurrentPatients,
  setPatient: setPatient
};
//# sourceMappingURL=index.js.map
