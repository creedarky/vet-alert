import angular from 'angular';
import uiRouter from 'angular-ui-router';

export class RootController {
  pacientes = [];
  alertas = [];
  /*@ngInject*/
  constructor(socket, pacienteService, Notification) {
    this.socket = socket.socket;
    this.pacienteService = pacienteService;
    this.Notification = Notification;
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
    paciente[data.tipo] = Object.assign({}, paciente[data.tipo], data);
    if (data.alerta) {
      let { alerta } = data;
      let alertaExistente = this.alertas.find(id => alerta.id === id);
      if (!alertaExistente) {
        this.alertas.push(alerta.id);
        this.agregarAlerta(paciente, alerta);
      }
    }
  }

  agregarAlerta(paciente, alerta) {
    let mensaje = `<b>${paciente.nombre}</b><br/> ${alerta.mensajes.map(m => `${m}<br/>`)}`;
    this.Notification({message: mensaje}, alerta.tipo);
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
