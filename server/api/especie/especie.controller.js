/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/especies              ->  index
 * POST    /api/especies              ->  create
 * GET     /api/especies/:id          ->  show
 * PUT     /api/especies/:id          ->  upsert
 * PATCH   /api/especies/:id          ->  patch
 * DELETE  /api/especies/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Especie, insertLog} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Especies
export function index(req, res) {
  return Especie.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Especie from the DB
export function show(req, res) {
  return Especie.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Especie in the DB
export function create(req, res) {
  return Especie.create(req.body)
    .then((result) => {
      insertLog(req);
      respondWithResult(res, 201)(result);
    })
    .catch(handleError(res));
}

// Upserts the given Especie in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return Especie.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Especie in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Especie.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Especie from the DB
export function destroy(req, res) {
  return Especie.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
