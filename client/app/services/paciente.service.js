'use strict';

/*@ngInject*/
export default function pacienteService($resource) {

  let pacientes = [];

  const getPacientes = () => {
    return pacientes;
  };

  const setPacientes = (p) => {
    pacientes = p;
  };

  const api = $resource('/api/pacientes/:id', {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
  return {
    getPacientes,
    setPacientes,
    api
  };
}

