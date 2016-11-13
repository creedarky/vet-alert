import angular from 'angular';
import uiRouter from 'angular-ui-router';

export class RootController {
  pacientes = [];
  alertas = [];
  alertasEliminadas = [];
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
      console.log(data.alerta);
    }
    if (data.alerta) {
      let { alerta } = data;
      let alertaExistente = this.alertas.find(a => alerta.id === a.id);
      let alertaEliminada = this.alertasEliminadas.find(id => alerta.id === id);
      if (!alertaEliminada && !alertaExistente) {
        this.alertas.push(alerta);
        console.log(this.alertas);
      }
    }
  }

  cerrarAlerta(index) {
    let alerta = this.alertas[index];
    this.alertasEliminadas.push(alerta.id);
    this.alertas.splice(index, 1);
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
      template: require('./root.html'),
      authenticate: true,
      controller: RootController,
      controllerAs: 'rootCtrl'
    });
  })
  .name;
