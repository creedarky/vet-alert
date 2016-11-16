'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('especie-crear', {
      url: '/especie',
      template: '<especie></especie>'
    })
    .state('especie-list', {
      url: '/especies',
      template: '<especie-list></especie-list>'
    });
}
