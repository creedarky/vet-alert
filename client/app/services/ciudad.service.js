/**
 * Created by Stefanie Figueroa on 15-11-2016.
 */
'use strict';

export default function ciudadService($resource) {
  'ngInject';


  return $resource('/api/ciudades/:id', {id: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
}
