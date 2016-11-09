'use strict';

var app = require('../..');
import request from 'supertest';

var newMonitoreoPaciente;

describe('MonitoreoPaciente API:', function() {
  describe('GET /api/monitoreo-pacientes', function() {
    var monitoreoPacientes;

    beforeEach(function(done) {
      request(app)
        .get('/api/monitoreo-pacientes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          monitoreoPacientes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(monitoreoPacientes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/monitoreo-pacientes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/monitoreo-pacientes')
        .send({
          name: 'New MonitoreoPaciente',
          info: 'This is the brand new monitoreoPaciente!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMonitoreoPaciente = res.body;
          done();
        });
    });

    it('should respond with the newly created monitoreoPaciente', function() {
      expect(newMonitoreoPaciente.name).to.equal('New MonitoreoPaciente');
      expect(newMonitoreoPaciente.info).to.equal('This is the brand new monitoreoPaciente!!!');
    });
  });

  describe('GET /api/monitoreo-pacientes/:id', function() {
    var monitoreoPaciente;

    beforeEach(function(done) {
      request(app)
        .get(`/api/monitoreo-pacientes/${newMonitoreoPaciente._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          monitoreoPaciente = res.body;
          done();
        });
    });

    afterEach(function() {
      monitoreoPaciente = {};
    });

    it('should respond with the requested monitoreoPaciente', function() {
      expect(monitoreoPaciente.name).to.equal('New MonitoreoPaciente');
      expect(monitoreoPaciente.info).to.equal('This is the brand new monitoreoPaciente!!!');
    });
  });

  describe('PUT /api/monitoreo-pacientes/:id', function() {
    var updatedMonitoreoPaciente;

    beforeEach(function(done) {
      request(app)
        .put(`/api/monitoreo-pacientes/${newMonitoreoPaciente._id}`)
        .send({
          name: 'Updated MonitoreoPaciente',
          info: 'This is the updated monitoreoPaciente!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMonitoreoPaciente = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMonitoreoPaciente = {};
    });

    it('should respond with the original monitoreoPaciente', function() {
      expect(updatedMonitoreoPaciente.name).to.equal('New MonitoreoPaciente');
      expect(updatedMonitoreoPaciente.info).to.equal('This is the brand new monitoreoPaciente!!!');
    });

    it('should respond with the updated monitoreoPaciente on a subsequent GET', function(done) {
      request(app)
        .get(`/api/monitoreo-pacientes/${newMonitoreoPaciente._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          let monitoreoPaciente = res.body;

          expect(monitoreoPaciente.name).to.equal('Updated MonitoreoPaciente');
          expect(monitoreoPaciente.info).to.equal('This is the updated monitoreoPaciente!!!');

          done();
        });
    });
  });

  describe('PATCH /api/monitoreo-pacientes/:id', function() {
    var patchedMonitoreoPaciente;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/monitoreo-pacientes/${newMonitoreoPaciente._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched MonitoreoPaciente' },
          { op: 'replace', path: '/info', value: 'This is the patched monitoreoPaciente!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patchedMonitoreoPaciente = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMonitoreoPaciente = {};
    });

    it('should respond with the patched monitoreoPaciente', function() {
      expect(patchedMonitoreoPaciente.name).to.equal('Patched MonitoreoPaciente');
      expect(patchedMonitoreoPaciente.info).to.equal('This is the patched monitoreoPaciente!!!');
    });
  });

  describe('DELETE /api/monitoreo-pacientes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/monitoreo-pacientes/${newMonitoreoPaciente._id}`)
        .expect(204)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when monitoreoPaciente does not exist', function(done) {
      request(app)
        .delete(`/api/monitoreo-pacientes/${newMonitoreoPaciente._id}`)
        .expect(404)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
