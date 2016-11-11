'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './apoderado.routes';

export class ApoderadoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('webappApp.views.apoderado', [uiRouter])
  .config(routes)
  .component('apoderado', {
    template: require('./apoderado.html'),
    controller: ApoderadoComponent,
    controllerAs: 'apoderadoCtrl'
  })
  .name;
