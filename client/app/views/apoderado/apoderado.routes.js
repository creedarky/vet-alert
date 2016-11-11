'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('apoderado', {
      url: '/apoderado',
      template: '<apoderado></apoderado>'
    });
}
