import angular from 'angular';

import routes from './paciente.routes';
import PacienteCrearComponent from './crear/paciente-crear.component';
import templatePacienteCrear from './crear/paciente.html'
import PacienteListComponent from './paciente-list.component';
import templatePacienteList from './paciente-list.html'
import PacienteEditComponent from './editar/paciente-edit.component';
import templatePacienteEdit from './editar/paciente-edit.html'


export default angular.module('webappApp.views.paciente', [])
  .config(routes)
  .component('pacienteCrear', {
    template: templatePacienteCrear,
    controller: PacienteCrearComponent,
  })
  .component('pacienteList', {
    template: templatePacienteList,
    controller: PacienteListComponent,
  })
  .component('pacienteEdit', {
    template: templatePacienteEdit,
    controller: PacienteEditComponent,
  })

  .name;
