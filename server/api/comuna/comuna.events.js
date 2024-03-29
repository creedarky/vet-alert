/**
 * Comuna model events
 */

'use strict';

import {EventEmitter} from 'events';
var Comuna = require('../../sqldb').Comuna;
var ComunaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ComunaEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Comuna.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ComunaEvents.emit(`${event}: + ${doc._id}`, doc);
    ComunaEvents.emit(event, doc);
    done(null);
  };
}

export default ComunaEvents;
