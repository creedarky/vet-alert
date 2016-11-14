import ecgComponent from './ecg/ecg.component';

export default angular.module('webappApp.components', [])
  .component('ecg', {
    template: '<div />',
    bindings: { valor: '<', x: '<' },
    controller: ecgComponent
  })
  .name;
