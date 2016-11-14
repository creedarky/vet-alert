/**
 * Rol model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Rol = require('../../sqldb').Rol;
var RolEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
RolEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Rol.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    RolEvents.emit(event + ': + ' + doc._id, doc);
    RolEvents.emit(event, doc);
    done(null);
  };
}

exports.default = RolEvents;
//# sourceMappingURL=rol.events.js.map
