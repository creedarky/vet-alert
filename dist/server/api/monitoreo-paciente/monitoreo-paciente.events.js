/**
 * MonitoreoPaciente model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var MonitoreoPaciente = require('../../sqldb').MonitoreoPaciente;
var MonitoreoPacienteEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
MonitoreoPacienteEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  MonitoreoPaciente.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    MonitoreoPacienteEvents.emit(event + ': + ' + doc._id, doc);
    MonitoreoPacienteEvents.emit(event, doc);
    done(null);
  };
}

exports.default = MonitoreoPacienteEvents;
//# sourceMappingURL=monitoreo-paciente.events.js.map
