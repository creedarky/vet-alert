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

import apiUtils from '../apiutils';
import {Paciente, Monitor, Especie, insertLog} from '../../sqldb';


// Gets a list of Pacientes
export function index(req, res) {
  return Paciente.findAll({
    include: [
      {
        model: Especie, as: 'especie'
      }
    ]
  })
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Gets a single Paciente from the DB
export function show(req, res) {
  return Paciente.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Creates a new Paciente in the DB
export function create(req, res) {
  return Paciente.create(req.body)
    .then(apiUtils.respondWithResult(res, 201))
    .catch(apiUtils.handleError(res));
}

// Upserts the given Paciente in the DB at the specified ID
export function upsert(req, res) {
  // if (req.body.id) {
  //   delete req.body.id;
  // }

  return Paciente.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((result) => {
      insertLog(req);
      apiUtils.respondWithResult(res, 201)(result);
    })
    .catch(apiUtils.handleError(res));
}

// Updates an existing Paciente in the DB
export function patch(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  return Paciente.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.patchUpdates(req.body))
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Deletes a Paciente from the DB
export function destroy(req, res) {
  return Paciente.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.removeEntity(res))
    .catch(apiUtils.handleError(res));
}
