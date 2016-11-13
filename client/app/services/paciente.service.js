'use strict';

/*@ngInject*/
export default function pacienteService() {

  let pacientes = [];

  const getPacientes = () => {
    console.log(pacientes);
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

