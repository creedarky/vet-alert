'use strict';


export default class EditPacienteComponent {

  errors = {};
  submitted = false;

  /*@ngInject*/
  constructor(pacienteService, apoderadoService, especieService, monitorService, $stateParams, $state, $q) {
    this.monitores = monitorService.query();
    this.apoderados = apoderadoService.query();
    this.especies = especieService.query();
    this.paciente = pacienteService.api.get({id: $stateParams.id});

    $q.all([this.monitores.$promise, this.apoderados.$promise, this.especies.$promise, this.paciente.$promise])
      .then(() => {
        this.monitor = this.monitores.find(m => m.id === this.paciente.id_monitor);
        this.apoderado = this.apoderados.find(a => a.id === this.paciente.id_apoderado);
        console.log(this.apoderado);
        this.especie = this.especies.find(e => e.id === this.paciente.id_especie);
      });
    this.$state = $state;
  }


  editarPaciente(form) {
    if (form.$valid) {
      this.submitted = true;
      this.paciente.id_monitor = this.monitor ? this.monitor.id : null;
      this.paciente.id_apoderado = this.apoderado.id;
      this.paciente.id_especie = this.especie.id;
      this.paciente.$update().then(() => {
        this.$state.go('paciente-list');
      });
    }
  }
}
