/**
 * MonitoreoPaciente model events
 */

'use strict';

import {EventEmitter} from 'events';
var MonitoreoPaciente = require('../../sqldb').MonitoreoPaciente;
var MonitoreoPacienteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MonitoreoPacienteEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  MonitoreoPaciente.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    MonitoreoPacienteEvents.emit(`${event}: + ${doc._id}`, doc);
    MonitoreoPacienteEvents.emit(event, doc);
    done(null);
  };
}

export default MonitoreoPacienteEvents;
