'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var monitoreoPacienteCtrlStub = {
  index: 'monitoreoPacienteCtrl.index',
  show: 'monitoreoPacienteCtrl.show',
  create: 'monitoreoPacienteCtrl.create',
  upsert: 'monitoreoPacienteCtrl.upsert',
  patch: 'monitoreoPacienteCtrl.patch',
  destroy: 'monitoreoPacienteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var monitoreoPacienteIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './monitoreo-paciente.controller': monitoreoPacienteCtrlStub
});

describe('MonitoreoPaciente API Router:', function() {
  it('should return an express router instance', function() {
    expect(monitoreoPacienteIndex).to.equal(routerStub);
  });

  describe('GET /api/monitoreo-pacientes', function() {
    it('should route to monitoreoPaciente.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'monitoreoPacienteCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/monitoreo-pacientes/:id', function() {
    it('should route to monitoreoPaciente.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'monitoreoPacienteCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/monitoreo-pacientes', function() {
    it('should route to monitoreoPaciente.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'monitoreoPacienteCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/monitoreo-pacientes/:id', function() {
    it('should route to monitoreoPaciente.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'monitoreoPacienteCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/monitoreo-pacientes/:id', function() {
    it('should route to monitoreoPaciente.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'monitoreoPacienteCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/monitoreo-pacientes/:id', function() {
    it('should route to monitoreoPaciente.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'monitoreoPacienteCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
