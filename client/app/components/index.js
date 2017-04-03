import ecgComponent from './ecg/ecg.component';
import pacienteComponent from './paciente/paciente.component';
import editarPacienteComponent from './editar-paciente/editar-paciente.component';

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
  .component('editar', {
    template: require('./editar-paciente/editar-paciente.html'),
    controller: editarPacienteComponent,
    bindings: { paciente: '<', especie: '<' },
    controllerAs: 'pacienteCtrl'
  })
  .name;
