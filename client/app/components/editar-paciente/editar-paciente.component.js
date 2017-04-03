'use strict';
const angular = require('angular');

export default class PacienteComponent {
  /*@ngInject*/
  constructor(pacienteService, $timeout, socket) {
    this.pacienteService = pacienteService;
    this.$timeout = $timeout;
    this.socket = socket.socket;
    console.log(socket, this.socket);
    this.editPaciente = Object.assign({}, this.paciente);
    this.editEspecie = Object.assign({}, this.especie);
  }

  $onInit() {
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

  editarPaciente(formPaciente) {
    const paciente = Object.assign({}, this.editPaciente);
    paciente.especie = this.editEspecie;
    console.log(this.pacienteService);
    this.pacienteService.api.update(paciente);
  }
}

