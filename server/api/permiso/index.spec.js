'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var permisoCtrlStub = {
  index: 'permisoCtrl.index',
  show: 'permisoCtrl.show',
  create: 'permisoCtrl.create',
  upsert: 'permisoCtrl.upsert',
  patch: 'permisoCtrl.patch',
  destroy: 'permisoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var permisoIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './permiso.controller': permisoCtrlStub
});

describe('Permiso API Router:', function() {
  it('should return an express router instance', function() {
    expect(permisoIndex).to.equal(routerStub);
  });

  describe('GET /api/permisos', function() {
    it('should route to permiso.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'permisoCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/permisos/:id', function() {
    it('should route to permiso.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'permisoCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/permisos', function() {
    it('should route to permiso.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'permisoCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/permisos/:id', function() {
    it('should route to permiso.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'permisoCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/permisos/:id', function() {
    it('should route to permiso.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'permisoCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/permisos/:id', function() {
    it('should route to permiso.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'permisoCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
