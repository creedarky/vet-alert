'use strict';

export default function routes($stateProvider, appConfig) {
  'ngInject';

  console.log(appConfig);
  $stateProvider.state('admin', {
    url: '/admin',
    template: require('./admin.html'),
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: appConfig.PERMISOS.USUARIOS
  });
}
