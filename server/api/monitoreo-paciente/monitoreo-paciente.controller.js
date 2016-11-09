/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/monitoreo-pacientes              ->  index
 * POST    /api/monitoreo-pacientes              ->  create
 * GET     /api/monitoreo-pacientes/:id          ->  show
 * PUT     /api/monitoreo-pacientes/:id          ->  upsert
 * PATCH   /api/monitoreo-pacientes/:id          ->  patch
 * DELETE  /api/monitoreo-pacientes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {MonitoreoPaciente} from '../../sqldb';

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

// Gets a list of MonitoreoPacientes
export function index(req, res) {
  return MonitoreoPaciente.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single MonitoreoPaciente from the DB
export function show(req, res) {
  return MonitoreoPaciente.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new MonitoreoPaciente in the DB
export function create(req, res) {
  return MonitoreoPaciente.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given MonitoreoPaciente in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return MonitoreoPaciente.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing MonitoreoPaciente in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return MonitoreoPaciente.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a MonitoreoPaciente from the DB
export function destroy(req, res) {
  return MonitoreoPaciente.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
