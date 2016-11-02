'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var estadoCtrlStub = {
  index: 'estadoCtrl.index',
  show: 'estadoCtrl.show',
  create: 'estadoCtrl.create',
  upsert: 'estadoCtrl.upsert',
  patch: 'estadoCtrl.patch',
  destroy: 'estadoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var estadoIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './estado.controller': estadoCtrlStub
});

describe('Estado API Router:', function() {
  it('should return an express router instance', function() {
    expect(estadoIndex).to.equal(routerStub);
  });

  describe('GET /api/estados', function() {
    it('should route to estado.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'estadoCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/estados/:id', function() {
    it('should route to estado.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'estadoCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/estados', function() {
    it('should route to estado.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'estadoCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/estados/:id', function() {
    it('should route to estado.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'estadoCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/estados/:id', function() {
    it('should route to estado.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'estadoCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/estados/:id', function() {
    it('should route to estado.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'estadoCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
