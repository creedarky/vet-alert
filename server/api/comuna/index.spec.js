'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var comunaCtrlStub = {
  index: 'comunaCtrl.index',
  show: 'comunaCtrl.show',
  create: 'comunaCtrl.create',
  upsert: 'comunaCtrl.upsert',
  patch: 'comunaCtrl.patch',
  destroy: 'comunaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var comunaIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './comuna.controller': comunaCtrlStub
});

describe('Comuna API Router:', function() {
  it('should return an express router instance', function() {
    expect(comunaIndex).to.equal(routerStub);
  });

  describe('GET /api/comunas', function() {
    it('should route to comuna.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'comunaCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/comunas/:id', function() {
    it('should route to comuna.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'comunaCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/comunas', function() {
    it('should route to comuna.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'comunaCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/comunas/:id', function() {
    it('should route to comuna.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'comunaCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/comunas/:id', function() {
    it('should route to comuna.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'comunaCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/comunas/:id', function() {
    it('should route to comuna.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'comunaCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
