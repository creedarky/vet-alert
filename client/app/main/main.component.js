import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  monitores = [];

  /*@ngInject*/
  constructor(socket, monitorService) {
    this.socket = socket.socket;
    this.monitorService = monitorService;
  }

  $onInit() {
    this.monitores = this.monitorService.query();
    console.log(this.monitores);

    this.socket.on('data', data => {
      try {
        let parsedData = JSON.parse(data);
        console.log(parsedData);
        this.addData(parsedData);
      } catch(e) {} // eslint-disable-line
    });
  }

  addData(data) {
    console.log('addData');
    const monitor = this.monitores.find(m => m.id === data.idMonitor);
    console.log(monitor);
    if (!monitor) {
      return;
    }
    monitor[data.tipo] = data;
    console.log(data);
  }
}

export default angular.module('webappApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
