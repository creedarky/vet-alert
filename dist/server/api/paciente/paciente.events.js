/**
 * Paciente model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Paciente = require('../../sqldb').Paciente;
var PacienteEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PacienteEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Paciente.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    PacienteEvents.emit(event + ': + ' + doc._id, doc);
    PacienteEvents.emit(event, doc);
    done(null);
  };
}

exports.default = PacienteEvents;
//# sourceMappingURL=paciente.events.js.map
