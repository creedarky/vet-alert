'use strict';

var app = require('../..');
import request from 'supertest';

var newPermiso;

describe('Permiso API:', function() {
  describe('GET /api/permisos', function() {
    var permisos;

    beforeEach(function(done) {
      request(app)
        .get('/api/permisos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          permisos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(permisos).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/permisos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/permisos')
        .send({
          name: 'New Permiso',
          info: 'This is the brand new permiso!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPermiso = res.body;
          done();
        });
    });

    it('should respond with the newly created permiso', function() {
      expect(newPermiso.name).to.equal('New Permiso');
      expect(newPermiso.info).to.equal('This is the brand new permiso!!!');
    });
  });

  describe('GET /api/permisos/:id', function() {
    var permiso;

    beforeEach(function(done) {
      request(app)
        .get(`/api/permisos/${newPermiso._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          permiso = res.body;
          done();
        });
    });

    afterEach(function() {
      permiso = {};
    });

    it('should respond with the requested permiso', function() {
      expect(permiso.name).to.equal('New Permiso');
      expect(permiso.info).to.equal('This is the brand new permiso!!!');
    });
  });

  describe('PUT /api/permisos/:id', function() {
    var updatedPermiso;

    beforeEach(function(done) {
      request(app)
        .put(`/api/permisos/${newPermiso._id}`)
        .send({
          name: 'Updated Permiso',
          info: 'This is the updated permiso!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPermiso = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPermiso = {};
    });

    it('should respond with the original permiso', function() {
      expect(updatedPermiso.name).to.equal('New Permiso');
      expect(updatedPermiso.info).to.equal('This is the brand new permiso!!!');
    });

    it('should respond with the updated permiso on a subsequent GET', function(done) {
      request(app)
        .get(`/api/permisos/${newPermiso._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let permiso = res.body;

          expect(permiso.name).to.equal('Updated Permiso');
          expect(permiso.info).to.equal('This is the updated permiso!!!');

          done();
        });
    });
  });

  describe('PATCH /api/permisos/:id', function() {
    var patchedPermiso;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/permisos/${newPermiso._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Permiso' },
          { op: 'replace', path: '/info', value: 'This is the patched permiso!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPermiso = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPermiso = {};
    });

    it('should respond with the patched permiso', function() {
      expect(patchedPermiso.name).to.equal('Patched Permiso');
      expect(patchedPermiso.info).to.equal('This is the patched permiso!!!');
    });
  });

  describe('DELETE /api/permisos/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/permisos/${newPermiso._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when permiso does not exist', function(done) {
      request(app)
        .delete(`/api/permisos/${newPermiso._id}`)
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
