import angular from 'angular';
import monitorService from './monitor.service';
import pacienteService from './paciente.service';
import especieService from './especie.service';
import ciudadService from './ciudad.service';
import comunaService from './comuna.service';
import apoderadoService from './apoderado.service';

export default angular.module('webappApp.services', [])
  .factory('monitorService', monitorService)
  .factory('pacienteService', pacienteService)
  .factory('especieService', especieService)
  .factory('comunaService', comunaService)
  .factory('ciudadService', ciudadService)
  .factory('apoderadoService', apoderadoService)
  .name;
