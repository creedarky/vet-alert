import ecgComponent from './ecg/ecg.component';
import pacienteComponent from './paciente/paciente.component';

export default angular.module('webappApp.components', [])
  .component('ecg', {
    template: '<div />',
    bindings: { valor: '<', x: '<', beep: '<' },
    controller: ecgComponent
  })
  .component('paciente', {
    template: require('./paciente/paciente.html'),
    controller: pacienteComponent,
    bindings: { paciente: '<' },
    controllerAs: 'pacienteCtrl'
  })
  .name;
