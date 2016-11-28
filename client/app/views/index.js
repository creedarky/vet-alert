import root from './root/root';
import main from './main/main.component';
import paciente from './paciente/';
import especie from './especie/';
import admin from './admin/';
import account from './account/';
import reportes from './reporte/reporte-monitoreo.component';
import comuna from './comuna/';
import apoderado from './apoderado/';

export default angular.module('webappApp.views', [root, main, paciente, especie, admin, account, reportes, comuna, apoderado])
  .name;
