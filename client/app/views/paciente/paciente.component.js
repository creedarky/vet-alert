'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './paciente.routes';

export class PacienteComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('webappApp.views.paciente', [uiRouter])
  .config(routes)
  .component('paciente', {
    template: require('./paciente.html'),
    controller: PacienteComponent,
    controllerAs: 'pacienteCtrl'
  })
  .name;
