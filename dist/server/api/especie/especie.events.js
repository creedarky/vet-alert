/**
 * Especie model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Especie = require('../../sqldb').Especie;
var EspecieEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
EspecieEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Especie.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    EspecieEvents.emit(event + ': + ' + doc._id, doc);
    EspecieEvents.emit(event, doc);
    done(null);
  };
}

exports.default = EspecieEvents;
//# sourceMappingURL=especie.events.js.map
