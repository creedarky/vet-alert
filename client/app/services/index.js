import angular from 'angular';
import monitorService from './monitor.service';
import pacienteService from './paciente.service';
import especieService from './especie.service';


export default angular.module('webappApp.services', [])
  .factory('monitorService', monitorService)
  .factory('pacienteService', pacienteService)
  .factory('especieService', especieService)
  .name;
