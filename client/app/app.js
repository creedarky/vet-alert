'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiNotification from 'angular-ui-notification';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import services from './services/';
import views from './views';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import components from './components/';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

angular.module('webappApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
    uiBootstrap, uiNotification, _Auth, services, views, navbar, footer, constants, socket, util, components
  ])
  .config(routeConfig)
  .config(function(NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 30000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'bottom'
    });
  })
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['webappApp'], {});
  });
