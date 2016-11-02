'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var eventoCtrlStub = {
  index: 'eventoCtrl.index',
  show: 'eventoCtrl.show',
  create: 'eventoCtrl.create',
  upsert: 'eventoCtrl.upsert',
  patch: 'eventoCtrl.patch',
  destroy: 'eventoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var eventoIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './evento.controller': eventoCtrlStub
});

describe('Evento API Router:', function() {
  it('should return an express router instance', function() {
    expect(eventoIndex).to.equal(routerStub);
  });

  describe('GET /api/eventos', function() {
    it('should route to evento.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'eventoCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/eventos/:id', function() {
    it('should route to evento.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'eventoCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/eventos', function() {
    it('should route to evento.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'eventoCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/eventos/:id', function() {
    it('should route to evento.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'eventoCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/eventos/:id', function() {
    it('should route to evento.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'eventoCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/eventos/:id', function() {
    it('should route to evento.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'eventoCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
