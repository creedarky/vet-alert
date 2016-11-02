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

import jsonpatch from 'fast-json-patch';
import {Apoderado} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
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
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
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

// Gets a list of Apoderados
export function index(req, res) {
  return Apoderado.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Apoderado from the DB
export function show(req, res) {
  return Apoderado.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Apoderado in the DB
export function create(req, res) {
  return Apoderado.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Apoderado in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Apoderado.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Apoderado in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Apoderado.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Apoderado from the DB
export function destroy(req, res) {
  return Apoderado.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
