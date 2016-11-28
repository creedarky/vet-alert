'use strict';

export default class PacienteComponent {
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
  paciente = {};

  constructor(pacienteService, apoderadoService, especieService, monitorService) {
    this.monitores = monitorService.query();
    this.apoderados = apoderadoService.query();
    this.especies = especieService.query();
    this.pacienteService = pacienteService;
  }

  crearPaciente(form) {
    if (form.$valid) {
      this.submitted = true;
      this.pacienteService.api.save(this.paciente).$promise.then(() => {
        this.submitted = false;
        this.paciente = {};
      })
    }
  }
}
