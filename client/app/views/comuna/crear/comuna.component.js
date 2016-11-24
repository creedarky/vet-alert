'use strict';


export default class ComunaComponent {
  /*@ngInject*/
  defaultComuna = {
    nombre: ''
  };

  errors = {};
  submitted = false;


  constructor(comunaService, ciudadService) {
    this.comunaService = comunaService;
    this.ciudades = ciudadService.query();
    console.log(this.ciudades);
  }

  crearComuna(form) {
    if (form.$valid) {
      this.submitted = true;
      this.comunaService.save(this.comuna).$promise.then(() => {
        this.submitted = false;
        this.comuna = Object.assign({}, this.defaultComuna);
      })
      .catch(err => {
        err = err.data;
        this.errors = {};
      });
    }
  }
}
