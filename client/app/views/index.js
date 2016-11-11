import main from './main/main.component';
import paciente from './paciente/paciente.component';
import especie from './especie/especie.component';
import admin from './admin/';
import account from './account/';

export default angular.module('webappApp.views', [main, paciente, especie, admin, account])
  .name;
