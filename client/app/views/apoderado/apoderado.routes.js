'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('apoderado-crear', {
      url: '/apoderado',
      template: '<apoderado></apoderado>'
    })
    .state('apoderado-list', {
      url: '/apoderados',
      template: '<apoderado-list></apoderado-list>'
    })
    .state('apoderado-edit', {
      url: '/apoderado/:id',
      template: '<apoderado-edit></apoderado-edit>'
    });
  ;
}
