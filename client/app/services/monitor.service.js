'use strict';
const angular = require('angular');

/*@ngInject*/
export default function monitorService($resource) {
  'ngInject';

  return $resource('/api/monitores/:id/:controller', {
    id: '@id'
  }, {

  });
}

