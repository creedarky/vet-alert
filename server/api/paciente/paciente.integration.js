'use strict';

var app = require('../..');
import request from 'supertest';

var newPaciente;

describe('Paciente API:', function() {
  describe('GET /api/pacientes', function() {
    var pacientes;

    beforeEach(function(done) {
      request(app)
        .get('/api/pacientes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pacientes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pacientes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/pacientes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pacientes')
        .send({
          name: 'New Paciente',
          info: 'This is the brand new paciente!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPaciente = res.body;
          done();
        });
    });

    it('should respond with the newly created paciente', function() {
      expect(newPaciente.name).to.equal('New Paciente');
      expect(newPaciente.info).to.equal('This is the brand new paciente!!!');
    });
  });

  describe('GET /api/pacientes/:id', function() {
    var paciente;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pacientes/${newPaciente._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          paciente = res.body;
          done();
        });
    });

    afterEach(function() {
      paciente = {};
    });

    it('should respond with the requested paciente', function() {
      expect(paciente.name).to.equal('New Paciente');
      expect(paciente.info).to.equal('This is the brand new paciente!!!');
    });
  });

  describe('PUT /api/pacientes/:id', function() {
    var updatedPaciente;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pacientes/${newPaciente._id}`)
        .send({
          name: 'Updated Paciente',
          info: 'This is the updated paciente!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPaciente = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPaciente = {};
    });

    it('should respond with the original paciente', function() {
      expect(updatedPaciente.name).to.equal('New Paciente');
      expect(updatedPaciente.info).to.equal('This is the brand new paciente!!!');
    });

    it('should respond with the updated paciente on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pacientes/${newPaciente._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let paciente = res.body;

          expect(paciente.name).to.equal('Updated Paciente');
          expect(paciente.info).to.equal('This is the updated paciente!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pacientes/:id', function() {
    var patchedPaciente;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pacientes/${newPaciente._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Paciente' },
          { op: 'replace', path: '/info', value: 'This is the patched paciente!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPaciente = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPaciente = {};
    });

    it('should respond with the patched paciente', function() {
      expect(patchedPaciente.name).to.equal('Patched Paciente');
      expect(patchedPaciente.info).to.equal('This is the patched paciente!!!');
    });
  });

  describe('DELETE /api/pacientes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pacientes/${newPaciente._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when paciente does not exist', function(done) {
      request(app)
        .delete(`/api/pacientes/${newPaciente._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
