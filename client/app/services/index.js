import monitorService from './monitor.service';

export default angular.module('webappApp.services', [])
  .factory('monitorService', monitorService)
  .name;
