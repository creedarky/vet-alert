'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var especieCtrlStub = {
  index: 'especieCtrl.index',
  show: 'especieCtrl.show',
  create: 'especieCtrl.create',
  upsert: 'especieCtrl.upsert',
  patch: 'especieCtrl.patch',
  destroy: 'especieCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var especieIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './especie.controller': especieCtrlStub
});

describe('Especie API Router:', function() {
  it('should return an express router instance', function() {
    expect(especieIndex).to.equal(routerStub);
  });

  describe('GET /api/especies', function() {
    it('should route to especie.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'especieCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/especies/:id', function() {
    it('should route to especie.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'especieCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/especies', function() {
    it('should route to especie.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'especieCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/especies/:id', function() {
    it('should route to especie.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'especieCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/especies/:id', function() {
    it('should route to especie.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'especieCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/especies/:id', function() {
    it('should route to especie.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'especieCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
