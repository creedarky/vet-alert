'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var rolCtrlStub = {
  index: 'rolCtrl.index',
  show: 'rolCtrl.show',
  create: 'rolCtrl.create',
  upsert: 'rolCtrl.upsert',
  patch: 'rolCtrl.patch',
  destroy: 'rolCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var rolIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './rol.controller': rolCtrlStub
});

describe('Rol API Router:', function() {
  it('should return an express router instance', function() {
    expect(rolIndex).to.equal(routerStub);
  });

  describe('GET /api/roles', function() {
    it('should route to rol.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'rolCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/roles/:id', function() {
    it('should route to rol.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'rolCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/roles', function() {
    it('should route to rol.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'rolCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/roles/:id', function() {
    it('should route to rol.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'rolCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/roles/:id', function() {
    it('should route to rol.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'rolCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/roles/:id', function() {
    it('should route to rol.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'rolCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
