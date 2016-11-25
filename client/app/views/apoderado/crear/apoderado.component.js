'use strict';

export default class ApoderadoComponent {
  /*@ngInject*/
  defaultApoderado = {
    rut: '',
    nombre: '',
    apellido: '',
    direccion: '',
    comuna: '',
    telefono: ''
  };

  errors = {};
  submitted = false;

  constructor(apoderadoService, comunaService) {
    this.apoderadoService = apoderadoService;
    this.comunas = comunaService.query();
    this.apoderado = Object.assign({}, this.defaultApoderado);
  }

  crearApoderado(form) {
    if (form.$valid) {
      this.submitted = true;
      this.apoderadoService.save(this.apoderado).$promise.then(() => {
        this.submitted = false;
        this.apoderado = Object(this.defaultApoderado);
      })
        .catch(err => {
          err = err.data;
          this.errors = {};
        });
    }
  }
}
