/**
 * Created by Stefanie Figueroa on 15-11-2016.
 */
'use strict';

export default function apoderadoService($resource) {
  'ngInject';

  return $resource('/api/apoderados/:apoderadoId', {apoderadoId: '@id'}, {
    update: {
      method: 'PUT'
    }
  });

}
