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
import cache from '../../cache';
import {Paciente, Monitor, Especie, insertLog, Apoderado} from '../../sqldb';


// Gets a list of Pacientes
export function index(req, res) {
  return Paciente.findAll({
    include: [
      {
        model: Especie, as: 'especie',
      },
      {
        model: Apoderado, as: 'apoderado'
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
    }, include: [
      {
        model: Especie, as: 'especie',
      },
      {
        model: Apoderado, as: 'apoderado'
      },
      {
        model: Monitor, as: 'monitor', required: false
      }
    ]
  })
    .then(apiUtils.handleEntityNotFound(res))
    .then(apiUtils.respondWithResult(res))
    .catch(apiUtils.handleError(res));
}

// Creates a new Paciente in the DB
export function create(req, res) {
  return desactivarPacientes(req.body)
    .then((paciente) => {
      return Paciente.create(paciente)
        .then((result) => {
          actualizarPacientes(paciente);
          insertLog(req);
          apiUtils.respondWithResult(res, 201)(result);
        }).catch(apiUtils.handleError(res));
    });
}

// Upserts the given Paciente in the DB at the specified ID
export function upsert(req, res) {
  // if (req.body.id) {
  //   delete req.body.id;
  // }
  return desactivarPacientes(req.body)
    .then((paciente) => {
      return Paciente.upsert(paciente, {
        where: {
          id: req.params.id
        }
      }).then(() => {
        insertLog(req);
        actualizarPacientes(paciente);
        return Paciente.findById(req.params.id)
          .then(p => {
            return apiUtils.respondWithResult(res, 200)(p);
          })
      }).catch(apiUtils.handleError(res));
    })
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


function desactivarPacientes(paciente) {
  return new Promise(resolve => {
    paciente.activo = !!paciente.id_monitor;
    if (!paciente.activo) {
      return resolve(paciente);
    }
    return Paciente.update({
      id_monitor: null,
      activo: false
    }, {
      where: {
        id_monitor: paciente.id_monitor
      }
    }).then(() => resolve(paciente))
  })
}

function actualizarPacientes(paciente) {
  if (!paciente.activo) {
    return;
  }
  return Paciente.findAll({
    where: {
      activo: true,
      id_monitor: {
        $ne: null
      }
    },
    include: [
      {
        model: Monitor, as: 'monitor'
      },
      {
        model: Especie, as: 'especie'
      }
    ]
  }).then(result => {
    const pacientes = JSON.parse(JSON.stringify(result));
    cache.setCurrentPatients(pacientes);
  })
}
