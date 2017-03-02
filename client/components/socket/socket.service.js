'use strict';

import angular from 'angular';
import io from 'socket.io-client';

function Socket(socketFactory, Auth) {
  'ngInject';
  // socket.io now auto-configures its connection when we ommit a connection url

  const ioSocket = io('', {
    // Send auth token on connection, you will need to DI the Auth service above
    // query: `token=${Auth.getToken()}`,
    path: '/socket.io-client'
  });

  const socket = socketFactory({
    ioSocket
  });

  return {
    socket
  };
}

export default angular.module('webappApp.socket', [])
  .factory('socket', Socket)
  .name;
