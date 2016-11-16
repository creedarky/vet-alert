import root from './root/root';
import main from './main/main.component';
import paciente from './paciente/paciente.component';
import especie from './especie/';
import admin from './admin/';
import account from './account/';

export default angular.module('webappApp.views', [root, main, paciente, especie, admin, account])
  .name;
