/**
 * Created by Stefanie Figueroa on 15-11-2016.
 */
'use strict';

export default function comunaService($resource) {
  'ngInject';


  return $resource('/api/comunas/:comunaId', {comunaId: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
}
