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


import apiUtils from '../apiutils';
import {Apoderado, Comuna, insertLog} from '../../sqldb';

// Gets a list of Apoderados
export function index(req, res) {
  return Apoderado.findAll({
    include: [
      {
        model: Comuna, as: 'comuna',
      }
    ]
  })
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Gets a single Apoderado from the DB
export function show(req, res) {
  return Apoderado.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Creates a new Apoderado in the DB
export function create(req, res) {
  return Apoderado.create(req.body)
    .then(apiUtils.respondWithResult(res, 201))
    .catch(apiUtils.handleError(res));
}

// Upserts the given Apoderado in the DB at the specified ID
export function upsert(req, res) {
  // if (req.body.id) {
  //   delete req.body.id;
  // }

  return Apoderado.upsert(req.body, {
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

// Updates an existing Apoderado in the DB
export function patch(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  return Apoderado.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.patchUpdates(req.body))
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Deletes a Apoderado from the DB
export function destroy(req, res) {
  return Apoderado.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.removeEntity(res))
    .catch(apiUtils.handleError(res));
}
