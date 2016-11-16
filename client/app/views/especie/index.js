'use strict';

import angular from 'angular';
import routes from './especie.routes';
import EspecieController from './especie.controller';

export default angular.module('webappApp.views.especie', [])
  .config(routes)
  .controller('EspecieController', EspecieController)
  .name;
