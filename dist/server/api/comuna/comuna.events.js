/**
 * Comuna model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Comuna = require('../../sqldb').Comuna;
var ComunaEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ComunaEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Comuna.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    ComunaEvents.emit(event + ': + ' + doc._id, doc);
    ComunaEvents.emit(event, doc);
    done(null);
  };
}

exports.default = ComunaEvents;
//# sourceMappingURL=comuna.events.js.map
