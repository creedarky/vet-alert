'use strict';

describe('Component: EspecieComponent', function() {
  // load the controller's module
  beforeEach(module('webappApp.especie'));

  var EspecieComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EspecieComponent = $componentController('especie', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
