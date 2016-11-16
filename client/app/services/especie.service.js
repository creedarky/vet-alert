/**
 * Created by Stefanie Figueroa on 15-11-2016.
 */
'use strict';

export default function especieService($resource) {
  'ngInject';


  return $resource('/api/especies/:especieId', {especieId: '@id'}, {
    update: {
      method: 'PUT'
    }
  });
}
