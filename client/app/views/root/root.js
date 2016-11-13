import angular from 'angular';
import uiRouter from 'angular-ui-router';

export class RootController {
  pacientes = [];

  /*@ngInject*/
  constructor(socket, pacienteService) {
    this.socket = socket.socket;
    this.pacienteService = pacienteService
  }

  $onInit() {
    this.socket.on('updated-patients', (patients) => this.updatePatients(patients));
    this.socket.on('data', (data) => this.addData(data));
  }

  addData(data) {
    const paciente = this.pacientes.find(p => p.id === data.idPaciente || p.monitor.id === data.idMonitor);

    if (!paciente) {
      return;
    }
    paciente[data.tipo] = data;
    if (data.tipo !== 'ecg') {
      console.log(paciente, data);
    }
  }

  updatePatients(pacientes) {
    this.pacientes = pacientes;
    this.pacienteService.setPacientes(pacientes);
  }
}

export default angular.module('webappApp.views.root', [uiRouter])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider.state('root', {
      abstract: true,
      template: '<div ui-view=""></div>',
      authenticate: true,
      controller: RootController
    });
  })
  .name;
