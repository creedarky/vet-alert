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

import apiUtils from '../apiutils';
import {Comuna, Ciudad, insertLog} from '../../sqldb';


// Gets a list of Comunas
export function index(req, res) {
  return Comuna.findAll({
    include: [
      {
        model: Ciudad, as: 'ciudad'
      }
    ]
  })
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Gets a single Comuna from the DB
export function show(req, res) {
  return Comuna.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Creates a new Comuna in the DB
export function create(req, res) {
  return Comuna.create(req.body)
    .then(apiUtils.respondWithResult(res, 201))
    .catch(apiUtils.handleError(res));
}

// Upserts the given Comuna in the DB at the specified ID
export function upsert(req, res) {
  // if (req.body.id) {
  //   delete req.body.id;
  // }

  return Comuna.upsert(req.body, {
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

// Updates an existing Comuna in the DB
export function patch(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  return Comuna.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.patchUpdates(req.body))
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Deletes a Comuna from the DB
export function destroy(req, res) {
  return Comuna.find({
    where: {
      id: req.params.id
    }
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.removeEntity(res))
    .catch(apiUtils.handleError(res));
}
