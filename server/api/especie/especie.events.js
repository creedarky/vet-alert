/**
 * Especie model events
 */

'use strict';

import {EventEmitter} from 'events';
var Especie = require('../../sqldb').Especie;
var EspecieEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EspecieEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Especie.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EspecieEvents.emit(`${event}: + ${doc._id}`, doc);
    EspecieEvents.emit(event, doc);
    done(null);
  };
}

export default EspecieEvents;
