'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './especie.routes';

export class EspecieComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('webappApp.views.especie', [uiRouter])
  .config(routes)
  .component('especie', {
    template: require('./especie.html'),
    controller: EspecieComponent,
    controllerAs: 'especieCtrl'
  })
  .name;
