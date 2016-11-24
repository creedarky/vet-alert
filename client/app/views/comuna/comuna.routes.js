'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('comuna-crear', {
      url: '/comuna',
      template: '<comuna></comuna>'
    })
    .state('comuna-list', {
      url: '/comunas',
      template: '<comuna-list></comuna-list>'
    })
    .state('comuna-edit', {
      url: '/comuna/:id',
      template: '<comuna-edit></comuna-edit>'
    });
}
