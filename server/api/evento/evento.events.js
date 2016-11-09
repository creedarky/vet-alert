/**
 * Evento model events
 */

'use strict';

import {EventEmitter} from 'events';
var Evento = require('../../sqldb').Evento;
var EventoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EventoEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Evento.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EventoEvents.emit(`${event}: + ${doc._id}`, doc);
    EventoEvents.emit(event, doc);
    done(null);
  };
}

export default EventoEvents;
