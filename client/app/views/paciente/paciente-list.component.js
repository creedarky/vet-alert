'use strict';
const angular = require('angular');


export default class PacienteListComponent {
  /*@ngInject*/

  constructor(pacienteService) {
    this.pacientes = pacienteService.api.query();
  }

  eliminarPaciente(paciente) {
    paciente.$remove().then(() => {
      this.pacientes = this.pacientes.filter(c => c.id !== paciente.id);
    });

  }
}
