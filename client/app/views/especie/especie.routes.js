'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('especie', {
      url: '/especie',
      template: '<especie></especie>'
    });
}
