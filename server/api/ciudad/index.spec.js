'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ciudadCtrlStub = {
  index: 'ciudadCtrl.index',
  show: 'ciudadCtrl.show',
  create: 'ciudadCtrl.create',
  upsert: 'ciudadCtrl.upsert',
  patch: 'ciudadCtrl.patch',
  destroy: 'ciudadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ciudadIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './ciudad.controller': ciudadCtrlStub
});

describe('Ciudad API Router:', function() {
  it('should return an express router instance', function() {
    expect(ciudadIndex).to.equal(routerStub);
  });

  describe('GET /api/ciudades', function() {
    it('should route to ciudad.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ciudadCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/ciudades/:id', function() {
    it('should route to ciudad.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ciudadCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/ciudades', function() {
    it('should route to ciudad.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ciudadCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/ciudades/:id', function() {
    it('should route to ciudad.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ciudadCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/ciudades/:id', function() {
    it('should route to ciudad.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ciudadCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/ciudades/:id', function() {
    it('should route to ciudad.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ciudadCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
