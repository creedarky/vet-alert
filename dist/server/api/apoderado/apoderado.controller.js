/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/apoderados              ->  index
 * POST    /api/apoderados              ->  create
 * GET     /api/apoderados/:id          ->  show
 * PUT     /api/apoderados/:id          ->  upsert
 * PATCH   /api/apoderados/:id          ->  patch
 * DELETE  /api/apoderados/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _apiutils = require('../apiutils');

var _apiutils2 = _interopRequireDefault(_apiutils);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Gets a list of Apoderados
function index(req, res) {
  return _sqldb.Apoderado.findAll({
    include: [{
      model: _sqldb.Comuna, as: 'comuna'
    }]
  }).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Gets a single Apoderado from the DB
function show(req, res) {
  return _sqldb.Apoderado.find({
    where: {
      id: req.params.id
    }
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Creates a new Apoderado in the DB
function create(req, res) {
  return _sqldb.Apoderado.create(req.body).then(_apiutils2.default.respondWithResult(res, 201)).catch(_apiutils2.default.handleError(res));
}

// Upserts the given Apoderado in the DB at the specified ID
function upsert(req, res) {
  // if (req.body.id) {
  //   delete req.body.id;
  // }

  return _sqldb.Apoderado.upsert(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function (result) {
    (0, _sqldb.insertLog)(req);
    _apiutils2.default.respondWithResult(res, 201)(result);
  }).catch(_apiutils2.default.handleError(res));
}

// Updates an existing Apoderado in the DB
function patch(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  return _sqldb.Apoderado.find({
    where: {
      id: req.params.id
    }
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.patchUpdates(req.body)).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Deletes a Apoderado from the DB
function destroy(req, res) {
  return _sqldb.Apoderado.find({
    where: {
      id: req.params.id
    }
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.removeEntity(res)).catch(_apiutils2.default.handleError(res));
}
//# sourceMappingURL=apoderado.controller.js.map
