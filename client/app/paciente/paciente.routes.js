'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('paciente', {
      url: '/paciente',
      template: '<paciente></paciente>'
    });
}
