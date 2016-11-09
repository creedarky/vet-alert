'use strict';
const angular = require('angular');

/*@ngInject*/
export function monitorService($resource) {
  'ngInject';

  return $resource('/api/monitores/:id/:controller', {
    id: '@id'
  }, {

  });
}

export default angular.module('webappApp.monitorService', [])
  .factory('monitorService', monitorService)
  .name;
