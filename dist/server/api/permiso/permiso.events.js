/**
 * Permiso model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Permiso = require('../../sqldb').Permiso;
var PermisoEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PermisoEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Permiso.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    PermisoEvents.emit(event + ': + ' + doc._id, doc);
    PermisoEvents.emit(event, doc);
    done(null);
  };
}

exports.default = PermisoEvents;
//# sourceMappingURL=permiso.events.js.map
