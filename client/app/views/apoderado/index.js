import angular from 'angular';

import routes from './apoderado.routes';
import ApoderadoCrearComponent from './crear/apoderado.component';
import templateApoderadoCrear from './crear/apoderado.html'
import ApoderadoListComponent from './apoderado-list.component';
import templateApoderadoList from './apoderado-list.html'
import ApoderadoEditComponent from './editar/apoderado-edit.component';
import templateApoderadoEdit from './editar/apoderado-edit.html'


export default angular.module('webappApp.views.apoderado', [])
  .config(routes)
  .component('apoderado', {
    template: templateApoderadoCrear,
    controller: ApoderadoCrearComponent,
  })
  .component('apoderadoList', {
    template: templateApoderadoList,
    controller: ApoderadoListComponent,
  })
  .component('apoderadoEdit', {
    template: templateApoderadoEdit,
    controller: ApoderadoEditComponent,
  })

  .name;
