'use strict';


export default class EditApoderadoComponent {
  /*@ngInject*/
  errors = {};
  submitted = false;


  constructor(apoderadoService, comunaService, $stateParams, $state, $timeout) {
    this.comunas = comunaService.query({}, () => {
      this.apoderado = apoderadoService.get({apoderadoId: $stateParams.id}, () => {
        this.comuna = this.comunas.find(c => c.id = this.apoderado.id_comuna);

        this.apoderado.id_comuna = this.comuna.id;
      });

    });
    this.$state = $state;
  }


  editarApoderado(form) {
    if (form.$valid) {
      this.submitted = true;
      this.apoderado.id_comuna = this.comuna.id;
      this.apoderado.$update().then(() => {
      this.$state.go('apoderado-list');
      });
    }
  }
}
