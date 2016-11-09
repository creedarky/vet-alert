'use strict';

var app = require('../..');
import request from 'supertest';

var newCiudad;

describe('Ciudad API:', function() {
  describe('GET /api/ciudades', function() {
    var ciudads;

    beforeEach(function(done) {
      request(app)
        .get('/api/ciudades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ciudads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(ciudads).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/ciudades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ciudades')
        .send({
          name: 'New Ciudad',
          info: 'This is the brand new ciudad!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCiudad = res.body;
          done();
        });
    });

    it('should respond with the newly created ciudad', function() {
      expect(newCiudad.name).to.equal('New Ciudad');
      expect(newCiudad.info).to.equal('This is the brand new ciudad!!!');
    });
  });

  describe('GET /api/ciudades/:id', function() {
    var ciudad;

    beforeEach(function(done) {
      request(app)
        .get(`/api/ciudades/${newCiudad._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ciudad = res.body;
          done();
        });
    });

    afterEach(function() {
      ciudad = {};
    });

    it('should respond with the requested ciudad', function() {
      expect(ciudad.name).to.equal('New Ciudad');
      expect(ciudad.info).to.equal('This is the brand new ciudad!!!');
    });
  });

  describe('PUT /api/ciudades/:id', function() {
    var updatedCiudad;

    beforeEach(function(done) {
      request(app)
        .put(`/api/ciudades/${newCiudad._id}`)
        .send({
          name: 'Updated Ciudad',
          info: 'This is the updated ciudad!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCiudad = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCiudad = {};
    });

    it('should respond with the original ciudad', function() {
      expect(updatedCiudad.name).to.equal('New Ciudad');
      expect(updatedCiudad.info).to.equal('This is the brand new ciudad!!!');
    });

    it('should respond with the updated ciudad on a subsequent GET', function(done) {
      request(app)
        .get(`/api/ciudades/${newCiudad._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          let ciudad = res.body;

          expect(ciudad.name).to.equal('Updated Ciudad');
          expect(ciudad.info).to.equal('This is the updated ciudad!!!');

          done();
        });
    });
  });

  describe('PATCH /api/ciudades/:id', function() {
    var patchedCiudad;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/ciudades/${newCiudad._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Ciudad' },
          { op: 'replace', path: '/info', value: 'This is the patched ciudad!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patchedCiudad = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCiudad = {};
    });

    it('should respond with the patched ciudad', function() {
      expect(patchedCiudad.name).to.equal('Patched Ciudad');
      expect(patchedCiudad.info).to.equal('This is the patched ciudad!!!');
    });
  });

  describe('DELETE /api/ciudades/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/ciudades/${newCiudad._id}`)
        .expect(204)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ciudad does not exist', function(done) {
      request(app)
        .delete(`/api/ciudades/${newCiudad._id}`)
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
