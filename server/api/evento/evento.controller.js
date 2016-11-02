/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/eventos              ->  index
 * POST    /api/eventos              ->  create
 * GET     /api/eventos/:id          ->  show
 * PUT     /api/eventos/:id          ->  upsert
 * PATCH   /api/eventos/:id          ->  patch
 * DELETE  /api/eventos/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Evento} from '../../sqldb';

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

// Gets a list of Eventos
export function index(req, res) {
  return Evento.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Evento from the DB
export function show(req, res) {
  return Evento.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Evento in the DB
export function create(req, res) {
  return Evento.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Evento in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Evento.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Evento in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Evento.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Evento from the DB
export function destroy(req, res) {
  return Evento.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
