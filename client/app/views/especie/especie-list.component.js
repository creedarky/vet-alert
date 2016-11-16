'use strict';
const angular = require('angular');


export default class EspecieListComponent {
  /*@ngInject*/

  constructor(especieService) {
    this.especieService = especieService;
    this.especies = especieService.query();
    console.log(this.especies);
  }

  eliminarEspecie(especie) {
    console.log(especie);
    especie.$remove().then(() => {
      this.especies = this.especies.filter(e => e.id !== especie.id);
    });

  }
}
