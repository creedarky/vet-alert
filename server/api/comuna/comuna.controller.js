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

import jsonpatch from 'fast-json-patch';
import {Comuna, Ciudad} from '../../sqldb';

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

// Gets a list of Comunas
export function index(req, res) {
  return Comuna.findAll({
    include: [
      {
        model: Ciudad, as: 'ciudad'
      }
    ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Comuna from the DB
export function show(req, res) {
  return Comuna.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Comuna in the DB
export function create(req, res) {
  return Comuna.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Comuna in the DB at the specified ID
export function upsert(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }

  return Comuna.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
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
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Comuna from the DB
export function destroy(req, res) {
  return Comuna.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
