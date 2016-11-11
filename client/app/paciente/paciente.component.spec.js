'use strict';

describe('Component: PacienteComponent', function() {
  // load the controller's module
  beforeEach(module('webappApp.paciente'));

  var PacienteComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PacienteComponent = $componentController('paciente', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
