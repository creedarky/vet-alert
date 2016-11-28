/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pacientes              ->  index
 * POST    /api/pacientes              ->  create
 * GET     /api/pacientes/:id          ->  show
 * PUT     /api/pacientes/:id          ->  upsert
 * PATCH   /api/pacientes/:id          ->  patch
 * DELETE  /api/pacientes/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _apiutils = require('../apiutils');

var _apiutils2 = _interopRequireDefault(_apiutils);

var _cache = require('../../cache');

var _cache2 = _interopRequireDefault(_cache);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Gets a list of Pacientes
function index(req, res) {
  return _sqldb.Paciente.findAll({
    include: [{
      model: _sqldb.Especie, as: 'especie'
    }, {
      model: _sqldb.Apoderado, as: 'apoderado'
    }]
  }).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Gets a single Paciente from the DB
function show(req, res) {
  return _sqldb.Paciente.find({
    where: {
      id: req.params.id
    }, include: [{
      model: _sqldb.Especie, as: 'especie'
    }, {
      model: _sqldb.Apoderado, as: 'apoderado'
    }, {
      model: _sqldb.Monitor, as: 'monitor', required: false
    }]
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Creates a new Paciente in the DB
function create(req, res) {
  return desactivarPacientes(req.body).then(function (paciente) {
    return _sqldb.Paciente.create(paciente).then(function (result) {
      actualizarPacientes(paciente);
      (0, _sqldb.insertLog)(req);
      _apiutils2.default.respondWithResult(res, 201)(result);
    }).catch(_apiutils2.default.handleError(res));
  });
}

// Upserts the given Paciente in the DB at the specified ID
function upsert(req, res) {
  // if (req.body.id) {
  //   delete req.body.id;
  // }
  return desactivarPacientes(req.body).then(function (paciente) {
    return _sqldb.Paciente.upsert(paciente, {
      where: {
        id: req.params.id
      }
    }).then(function () {
      (0, _sqldb.insertLog)(req);
      actualizarPacientes(paciente);
      return _sqldb.Paciente.findById(req.params.id).then(function (p) {
        return _apiutils2.default.respondWithResult(res, 200)(p);
      });
    }).catch(_apiutils2.default.handleError(res));
  });
}

// Updates an existing Paciente in the DB
function patch(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  return _sqldb.Paciente.find({
    where: {
      id: req.params.id
    }
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.patchUpdates(req.body)).then(_apiutils2.default.respondWithResult(res)).catch(_apiutils2.default.handleError(res));
}

// Deletes a Paciente from the DB
function destroy(req, res) {
  return _sqldb.Paciente.find({
    where: {
      id: req.params.id
    }
  }).then(_apiutils2.default.handleEntityNotFound(res)).then(_apiutils2.default.removeEntity(res)).catch(_apiutils2.default.handleError(res));
}

function desactivarPacientes(paciente) {
  return new _promise2.default(function (resolve) {
    paciente.activo = !!paciente.id_monitor;
    if (!paciente.activo) {
      return resolve(paciente);
    }
    return _sqldb.Paciente.update({
      id_monitor: null,
      activo: false
    }, {
      where: {
        id_monitor: paciente.id_monitor
      }
    }).then(function () {
      return resolve(paciente);
    });
  });
}

function actualizarPacientes(paciente) {
  if (!paciente.activo) {
    return;
  }
  return _sqldb.Paciente.findAll({
    where: {
      activo: true,
      id_monitor: {
        $ne: null
      }
    },
    include: [{
      model: _sqldb.Monitor, as: 'monitor'
    }, {
      model: _sqldb.Especie, as: 'especie'
    }]
  }).then(function (result) {
    var pacientes = JSON.parse((0, _stringify2.default)(result));
    _cache2.default.setCurrentPatients(pacientes);
  });
}
//# sourceMappingURL=paciente.controller.js.map
