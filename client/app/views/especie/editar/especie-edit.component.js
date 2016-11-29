'use strict';


export default class EditEspecieComponent {
  /*@ngInject*/
  errors = {};
  submitted = false;


  constructor(especieService, $stateParams, $state) {
    this.especieService = especieService;
    this.especie = this.especieService.get({especieId: $stateParams.id});
    this.$state = $state;
  }


  editarEspecie(form) {
    if (form.$valid) {
      this.submitted = true;
      this.especie.$update().then(() => {
        this.$state.go('especie-list');
      });
    }
  }
}
