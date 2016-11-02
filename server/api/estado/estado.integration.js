'use strict';

var app = require('../..');
import request from 'supertest';

var newEstado;

describe('Estado API:', function() {
  describe('GET /api/estados', function() {
    var estados;

    beforeEach(function(done) {
      request(app)
        .get('/api/estados')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          estados = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(estados).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/estados', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/estados')
        .send({
          name: 'New Estado',
          info: 'This is the brand new estado!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEstado = res.body;
          done();
        });
    });

    it('should respond with the newly created estado', function() {
      expect(newEstado.name).to.equal('New Estado');
      expect(newEstado.info).to.equal('This is the brand new estado!!!');
    });
  });

  describe('GET /api/estados/:id', function() {
    var estado;

    beforeEach(function(done) {
      request(app)
        .get(`/api/estados/${newEstado._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          estado = res.body;
          done();
        });
    });

    afterEach(function() {
      estado = {};
    });

    it('should respond with the requested estado', function() {
      expect(estado.name).to.equal('New Estado');
      expect(estado.info).to.equal('This is the brand new estado!!!');
    });
  });

  describe('PUT /api/estados/:id', function() {
    var updatedEstado;

    beforeEach(function(done) {
      request(app)
        .put(`/api/estados/${newEstado._id}`)
        .send({
          name: 'Updated Estado',
          info: 'This is the updated estado!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEstado = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEstado = {};
    });

    it('should respond with the original estado', function() {
      expect(updatedEstado.name).to.equal('New Estado');
      expect(updatedEstado.info).to.equal('This is the brand new estado!!!');
    });

    it('should respond with the updated estado on a subsequent GET', function(done) {
      request(app)
        .get(`/api/estados/${newEstado._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let estado = res.body;

          expect(estado.name).to.equal('Updated Estado');
          expect(estado.info).to.equal('This is the updated estado!!!');

          done();
        });
    });
  });

  describe('PATCH /api/estados/:id', function() {
    var patchedEstado;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/estados/${newEstado._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Estado' },
          { op: 'replace', path: '/info', value: 'This is the patched estado!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEstado = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEstado = {};
    });

    it('should respond with the patched estado', function() {
      expect(patchedEstado.name).to.equal('Patched Estado');
      expect(patchedEstado.info).to.equal('This is the patched estado!!!');
    });
  });

  describe('DELETE /api/estados/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/estados/${newEstado._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when estado does not exist', function(done) {
      request(app)
        .delete(`/api/estados/${newEstado._id}`)
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
