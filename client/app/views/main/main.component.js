import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  pacientes = [];

  /*@ngInject*/
  constructor(socket, $state, pacienteService) {
    this.socket = socket.socket;
    this.$state = $state;
    this.pacienteService = pacienteService;
  }

  $onInit() {
    this.pacientes = this.pacienteService.getPacientes();
    this.socket.on('updated-patients', this.updatePatients);
    this.socket.on('data', this.addData);
  }

  $onDestroy() {
    this.socket.removeListener('data', this.addData);
    this.socket.removeListener('updated-patients', this.updatePatients);
  }

  addData = (data) => {
    const paciente = this.pacientes.find(p => p.id === data.idPaciente);
    if (!paciente) {
      return;
    }
    paciente[data.tipo] = Object.assign({}, paciente[data.tipo], data);
  };

  updatePatients = (pacientes) => {
    console.log('###', pacientes);
    this.pacientes = pacientes;
    this.pacienteService.setPacientes(pacientes);
  };

  onClick(paciente) {
    // this.$state.go('root.paciente', {id: paciente.id});
    this.paciente = paciente;
    this.editando = false;
  }

  onEdit($event, paciente) {
    $event.preventDefault();
    $event.stopPropagation();
    this.paciente = paciente;
    this.editando = true;
  }
}

export default angular.module('webappApp.views.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
