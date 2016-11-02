/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/roles              ->  index
 * POST    /api/roles              ->  create
 * GET     /api/roles/:id          ->  show
 * PUT     /api/roles/:id          ->  upsert
 * PATCH   /api/roles/:id          ->  patch
 * DELETE  /api/roles/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Rol} from '../../sqldb';

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

// Gets a list of Rols
export function index(req, res) {
  return Rol.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Rol from the DB
export function show(req, res) {
  return Rol.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Rol in the DB
export function create(req, res) {
  return Rol.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Rol in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Rol.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Rol in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Rol.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Rol from the DB
export function destroy(req, res) {
  return Rol.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
