'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('reporteMonitoreo', {
      url: '/reporte/monitoreo',
      template: '<reporte-monitoreo></reporte-monitoreo>'
    });
}
