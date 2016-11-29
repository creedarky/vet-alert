'use strict';


export default class EditComunaComponent {
  /*@ngInject*/
  errors = {};
  submitted = false;


  constructor(comunaService, ciudadService, $stateParams, $state, $timeout) {
    this.ciudades = ciudadService.query({}, () => {
      this.comuna = comunaService.get({comunaId: $stateParams.id}, () => {
        this.ciudad = this.ciudades.find(c => c.id === this.comuna.id_ciudad);
        this.comuna.id_ciudad = this.ciudad.id;
      });
    });
    this.$state = $state;
  }


  editarComuna(form) {
    if (form.$valid) {
      this.submitted = true;
      this.comuna.id_ciudad = this.ciudad.id;
      this.comuna.$update().then(() => {
        this.$state.go('comuna-list');
      });
    }
  }
}
