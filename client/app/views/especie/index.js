import angular from 'angular';

import routes from './especie.routes';
import EspecieComponent from './crear/especie.component';
import templateEspecie from './crear/especie.html'
import EspecieEditComponent from './editar/especie-edit.component';
import templateEspecieEdit from './editar/especie-edit.html'
import EspecieListComponent from './especie-list.component';
import templateEspecieList from './especie-list.html';


export default angular.module('webappApp.views.especie', [])
  .config(routes)
  .component('especie', {
    template: templateEspecie,
    controller: EspecieComponent,
    controllerAs: 'vm'
  })
  .component('especieList', {
    template: templateEspecieList,
    controller: EspecieListComponent
  })
  .component('especieEdit', {
    template: templateEspecieEdit,
    controller: EspecieEditComponent,
    controllerAs: 'vm'
  })
  .name;
