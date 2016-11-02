/**
 * Ciudad model events
 */

'use strict';

import {EventEmitter} from 'events';
var Ciudad = require('../../sqldb').Ciudad;
var CiudadEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CiudadEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Ciudad.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CiudadEvents.emit(event + ':' + doc._id, doc);
    CiudadEvents.emit(event, doc);
    done(null);
  };
}

export default CiudadEvents;
