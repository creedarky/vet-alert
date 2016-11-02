'use strict';

describe('Component: ecg', function() {
  // load the component's module
  beforeEach(module('webappApp.ecg'));

  var ecgComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    ecgComponent = $componentController('ecg', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
