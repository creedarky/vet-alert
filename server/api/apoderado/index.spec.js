'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var apoderadoCtrlStub = {
  index: 'apoderadoCtrl.index',
  show: 'apoderadoCtrl.show',
  create: 'apoderadoCtrl.create',
  upsert: 'apoderadoCtrl.upsert',
  patch: 'apoderadoCtrl.patch',
  destroy: 'apoderadoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var apoderadoIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './apoderado.controller': apoderadoCtrlStub
});

describe('Apoderado API Router:', function() {
  it('should return an express router instance', function() {
    expect(apoderadoIndex).to.equal(routerStub);
  });

  describe('GET /api/apoderados', function() {
    it('should route to apoderado.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'apoderadoCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/apoderados/:id', function() {
    it('should route to apoderado.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'apoderadoCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/apoderados', function() {
    it('should route to apoderado.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'apoderadoCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/apoderados/:id', function() {
    it('should route to apoderado.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'apoderadoCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/apoderados/:id', function() {
    it('should route to apoderado.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'apoderadoCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/apoderados/:id', function() {
    it('should route to apoderado.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'apoderadoCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
