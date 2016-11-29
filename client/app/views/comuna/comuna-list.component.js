'use strict';
const angular = require('angular');


export default class ComunaListComponent {
  /*@ngInject*/

  constructor(comunaService) {
    this.comunas = comunaService.query();
  }

  eliminarComuna(comuna) {
    comuna.$remove().then(() => {
      this.comunas = this.comunas.filter(c => c.id !== comuna.id);
    });

  }
}
