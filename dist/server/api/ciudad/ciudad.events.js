/**
 * Ciudad model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Ciudad = require('../../sqldb').Ciudad;
var CiudadEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CiudadEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ciudad.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    CiudadEvents.emit(event + ': + ' + doc._id, doc);
    CiudadEvents.emit(event, doc);
    done(null);
  };
}

exports.default = CiudadEvents;
//# sourceMappingURL=ciudad.events.js.map
