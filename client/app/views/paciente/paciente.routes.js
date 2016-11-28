'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('paciente-crear', {
      url: '/paciente',
      template: '<paciente-crear></paciente-crear>'
    })
    .state('paciente-list', {
      url: '/pacientes',
      template: '<paciente-list></paciente-list>'
    })
    .state('paciente-edit', {
      url: '/paciente/:id',
      template: '<paciente-edit></paciente-edit>'
    });
  ;
}
