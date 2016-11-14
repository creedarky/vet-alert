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

exports.default = {
  emitter: emitter,
  getCurrentPatients: getCurrentPatients,
  setCurrentPatients: setCurrentPatients
};
//# sourceMappingURL=index.js.map
