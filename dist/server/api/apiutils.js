'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  respondWithResult: function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function () {
      var entity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (entity) {
        return res.status(statusCode).json(entity);
      }
      return res.status(statusCode).json({});
    };
  },
  patchUpdates: function patchUpdates(patches) {
    return function (entity) {
      try {
        _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
      } catch (err) {
        return _promise2.default.reject(err);
      }

      return entity.save();
    };
  },
  removeEntity: function removeEntity(res) {
    return function (entity) {
      if (entity) {
        return entity.destroy().then(function () {
          res.status(204).end();
        });
      }
    };
  },
  handleEntityNotFound: function handleEntityNotFound(res) {
    return function (entity) {
      if (!entity) {
        res.status(404).end();
        return null;
      }
      return entity;
    };
  },
  handleError: function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
      res.status(statusCode).send(err);
    };
  }
};
//# sourceMappingURL=apiutils.js.map
