'use strict';

var app = require('../..');
import request from 'supertest';

var newRol;

describe('Rol API:', function() {
  describe('GET /api/roles', function() {
    var rols;

    beforeEach(function(done) {
      request(app)
        .get('/api/roles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          rols = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(rols).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/roles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/roles')
        .send({
          name: 'New Rol',
          info: 'This is the brand new rol!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRol = res.body;
          done();
        });
    });

    it('should respond with the newly created rol', function() {
      expect(newRol.name).to.equal('New Rol');
      expect(newRol.info).to.equal('This is the brand new rol!!!');
    });
  });

  describe('GET /api/roles/:id', function() {
    var rol;

    beforeEach(function(done) {
      request(app)
        .get(`/api/roles/${newRol._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          rol = res.body;
          done();
        });
    });

    afterEach(function() {
      rol = {};
    });

    it('should respond with the requested rol', function() {
      expect(rol.name).to.equal('New Rol');
      expect(rol.info).to.equal('This is the brand new rol!!!');
    });
  });

  describe('PUT /api/roles/:id', function() {
    var updatedRol;

    beforeEach(function(done) {
      request(app)
        .put(`/api/roles/${newRol._id}`)
        .send({
          name: 'Updated Rol',
          info: 'This is the updated rol!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRol = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRol = {};
    });

    it('should respond with the original rol', function() {
      expect(updatedRol.name).to.equal('New Rol');
      expect(updatedRol.info).to.equal('This is the brand new rol!!!');
    });

    it('should respond with the updated rol on a subsequent GET', function(done) {
      request(app)
        .get(`/api/roles/${newRol._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let rol = res.body;

          expect(rol.name).to.equal('Updated Rol');
          expect(rol.info).to.equal('This is the updated rol!!!');

          done();
        });
    });
  });

  describe('PATCH /api/roles/:id', function() {
    var patchedRol;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/roles/${newRol._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Rol' },
          { op: 'replace', path: '/info', value: 'This is the patched rol!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRol = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRol = {};
    });

    it('should respond with the patched rol', function() {
      expect(patchedRol.name).to.equal('Patched Rol');
      expect(patchedRol.info).to.equal('This is the patched rol!!!');
    });
  });

  describe('DELETE /api/roles/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/roles/${newRol._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when rol does not exist', function(done) {
      request(app)
        .delete(`/api/roles/${newRol._id}`)
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
