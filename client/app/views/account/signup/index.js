'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('webappApp.views.account.signup', [])
  .controller('SignupController', SignupController)
  .name;
