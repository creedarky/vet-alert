'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('root.main', {
    url: '/',
    template: '<main></main>',
  });
}
