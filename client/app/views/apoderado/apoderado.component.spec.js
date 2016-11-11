'use strict';

describe('Component: ApoderadoComponent', function() {
  // load the controller's module
  beforeEach(module('webappApp.apoderado'));

  var ApoderadoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ApoderadoComponent = $componentController('apoderado', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
