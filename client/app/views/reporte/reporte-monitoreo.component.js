'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './reporte-monitoreo.routes';

export class ReporteMonitoreoComponent {
  /*@ngInject*/
  constructor($http) {
    $http.get('/api/reportes/monitoreo').then(({ data }) => {
      this.monitoreos = data;
    })
  }
}

export default angular.module('webappApp.views.reportes', [uiRouter])
  .config(routes)
  .component('reporteMonitoreo', {
    template: require('./reporte.monitoreo.html'),
    controller: ReporteMonitoreoComponent
  })
  .name;
