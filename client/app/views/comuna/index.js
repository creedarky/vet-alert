import angular from 'angular';

import routes from './comuna.routes';
import ComunaCrearComponent from './crear/comuna.component';
import templateComunaCrear from './crear/comuna.html'
import templateComunaList from './comuna-list.html';
import ComunaListComponent from './comuna-list.component';
import templateComunaEdit from './editar/comuna-edit.html';
import ComunaEditComponent from './editar/comuna-edit.component';


export default angular.module('webappApp.views.comuna', [])
  .config(routes)
  .component('comuna', {
    template: templateComunaCrear,
    controller: ComunaCrearComponent,
  })
  .component('comunaList', {
    template: templateComunaList,
    controller: ComunaListComponent
  })
  .component('comunaEdit', {
    template: templateComunaEdit,
    controller: ComunaEditComponent
  })
  .name;
