'use strict';

describe('Service: monitorService', function() {
  // load the service's module
  beforeEach(module('webappApp.monitorService'));

  // instantiate service
  var monitorService;
  beforeEach(inject(function(_monitorService_) {
    monitorService = _monitorService_;
  }));

  it('should do something', function() {
    expect(!!monitorService).to.be.true;
  });
});
