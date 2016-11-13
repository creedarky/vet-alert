'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('root.paciente', {
      url: '/paciente/:id',
      template: '<paciente></paciente>'
    });
}
