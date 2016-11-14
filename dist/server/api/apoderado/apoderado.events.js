/**
 * Apoderado model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Apoderado = require('../../sqldb').Apoderado;
var ApoderadoEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ApoderadoEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Apoderado.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    ApoderadoEvents.emit(event + ': + ' + doc._id, doc);
    ApoderadoEvents.emit(event, doc);
    done(null);
  };
}

exports.default = ApoderadoEvents;
//# sourceMappingURL=apoderado.events.js.map
