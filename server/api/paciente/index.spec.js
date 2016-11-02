'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pacienteCtrlStub = {
  index: 'pacienteCtrl.index',
  show: 'pacienteCtrl.show',
  create: 'pacienteCtrl.create',
  upsert: 'pacienteCtrl.upsert',
  patch: 'pacienteCtrl.patch',
  destroy: 'pacienteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pacienteIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './paciente.controller': pacienteCtrlStub
});

describe('Paciente API Router:', function() {
  it('should return an express router instance', function() {
    expect(pacienteIndex).to.equal(routerStub);
  });

  describe('GET /api/pacientes', function() {
    it('should route to paciente.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pacienteCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/pacientes/:id', function() {
    it('should route to paciente.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pacienteCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/pacientes', function() {
    it('should route to paciente.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pacienteCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/pacientes/:id', function() {
    it('should route to paciente.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pacienteCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pacientes/:id', function() {
    it('should route to paciente.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pacienteCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pacientes/:id', function() {
    it('should route to paciente.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pacienteCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
