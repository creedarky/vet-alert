/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/comunas              ->  index
 * POST    /api/comunas              ->  create
 * GET     /api/comunas/:id          ->  show
 * PUT     /api/comunas/:id          ->  upsert
 * PATCH   /api/comunas/:id          ->  patch
 * DELETE  /api/comunas/:id          ->  destroy
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

// Gets a list of Comunas
function index(req, res) {
  return _sqldb.Comuna.findAll({
    include: [{
      model: _sqldb.Ciudad, as: 'ciudad'
    }]
  }).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Gets a single Comuna from the DB
function show(req, res) {
  return _sqldb.Comuna.find({
    where: {
      id: req.params.id
    }
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Creates a new Comuna in the DB
function create(req, res) {
  return _sqldb.Comuna.create(req.body).then(_apiutils2.default.respondWithResult(res, 201)).catch(_apiutils2.default.handleError(res));
}

// Upserts the given Comuna in the DB at the specified ID
function upsert(req, res) {
  // if (req.body.id) {
  //   delete req.body.id;
  // }

  return _sqldb.Comuna.upsert(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function (result) {
    (0, _sqldb.insertLog)(req);
    _apiutils2.default.respondWithResult(res, 201)(result);
  }).catch(_apiutils2.default.handleError(res));
}

// Updates an existing Comuna in the DB
function patch(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  return _sqldb.Comuna.find({
    where: {
      id: req.params.id
    }
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.patchUpdates(req.body)).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Deletes a Comuna from the DB
function destroy(req, res) {
  return _sqldb.Comuna.find({
    where: {
      id: req.params.id
    }
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.removeEntity(res)).catch(_apiutils2.default.handleError(res));
}
//# sourceMappingURL=comuna.controller.js.map
