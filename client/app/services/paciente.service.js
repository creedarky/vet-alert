'use strict';

/*@ngInject*/
export default function pacienteService() {

  let pacientes = [];

  const getPacientes = () => {
    return pacientes;
  };

  const setPacientes = (p) => {
    pacientes = p;
  };

  return {
    getPacientes,
    setPacientes
  };
}

