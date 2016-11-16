'use strict';


export class EspecieComponent {
  /*@ngInject*/
  defaultEspecie = {
    nombre: '',
    nombre_comun: '',
    minPpm: '',
    maxPpm: '',
    minTemp: '',
    maxTemp: ''
  };

  errors = {};
  submitted = false;


  constructor(especieService) {
    this.especieService = especieService;
    this.especie = Object.assign({}, this.defaultEspecie);
  }


  crearEspecie(form) {
    if (form.$valid) {
      this.submitted = true;
      this.especieService.save(this.especie).$promise.then(() => {
        this.submitted = false;
        this.especie = Object(this.defaultEspecie);
      })
      .catch(err => {
        err = err.data;
        this.errors = {};
      });
    }
  }
}
