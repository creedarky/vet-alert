'use strict';
const angular = require('angular');

export default class PacienteComponent {
  /*@ngInject*/
  constructor($stateParams, pacienteService, $timeout, socket) {
    this.pacienteService = pacienteService;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.socket = socket;
  }

  $onInit() {
    // this.initPaciente();
  }

  $onDestroy() {
    this.$timeout.cancel(this.timeout);
  }

  initPaciente() {
    const paciente = this.pacienteService.getPacientes().find(p => parseInt(this.$stateParams.id) === p.id);
    if (!paciente) {
      this.timeout = this.$timeout(() => this.initPaciente(), 500);
    }
    this.paciente = paciente;
  }
}

