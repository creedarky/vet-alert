'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('webappApp.views.account.login', [])
  .controller('LoginController', LoginController)
  .name;
