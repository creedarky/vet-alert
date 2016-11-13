'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './paciente.routes';

export class PacienteComponent {
  /*@ngInject*/
  constructor($stateParams, pacienteService, $timeout, socket) {
    this.pacienteService = pacienteService;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.socket = socket;
  }

  $onInit() {
    console.log(this.monitores);
    this.initPaciente();
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
    console.log(this.paciente);
  }

  // onData = (data) => {
  //   console.log(this.paciente.id, data.idPaciente);
  //   if (data.idPaciente !== this.paciente.id) {
  //     return;
  //   }
  //   this.paciente[data.tipo] = data;
  // }

}

export default angular.module('webappApp.views.paciente', [uiRouter])
  .config(routes)
  .component('paciente', {
    template: require('./paciente.html'),
    controller: PacienteComponent,
    controllerAs: 'pacienteCtrl'
  })
  .name;
