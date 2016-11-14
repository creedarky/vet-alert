'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

// import routes from './paciente.routes';

export class PacienteComponent {
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

export default angular.module('webappApp.views.paciente', [uiRouter])
  .component('paciente', {
    template: require('./paciente.html'),
    controller: PacienteComponent,
    bindings: { paciente: '<' },
    controllerAs: 'pacienteCtrl'
  })
  .name;
