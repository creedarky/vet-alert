'use strict';
const angular = require('angular');


export default class ApoderadoListComponent {
  /*@ngInject*/

  constructor(apoderadoService) {
    this.apoderados = apoderadoService.query();
  }

  eliminarApoderado(apoderado) {
    apoderado.$remove().then(() => {
      this.apoderado = this.apoderados.filter(c => c.id !== apoderado.id);
    });

  }
}
