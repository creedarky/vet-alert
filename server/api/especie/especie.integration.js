'use strict';

var app = require('../..');
import request from 'supertest';

var newEspecie;

describe('Especie API:', function() {
  describe('GET /api/especies', function() {
    var especies;

    beforeEach(function(done) {
      request(app)
        .get('/api/especies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          especies = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(especies).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/especies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/especies')
        .send({
          name: 'New Especie',
          info: 'This is the brand new especie!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEspecie = res.body;
          done();
        });
    });

    it('should respond with the newly created especie', function() {
      expect(newEspecie.name).to.equal('New Especie');
      expect(newEspecie.info).to.equal('This is the brand new especie!!!');
    });
  });

  describe('GET /api/especies/:id', function() {
    var especie;

    beforeEach(function(done) {
      request(app)
        .get(`/api/especies/${newEspecie._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          especie = res.body;
          done();
        });
    });

    afterEach(function() {
      especie = {};
    });

    it('should respond with the requested especie', function() {
      expect(especie.name).to.equal('New Especie');
      expect(especie.info).to.equal('This is the brand new especie!!!');
    });
  });

  describe('PUT /api/especies/:id', function() {
    var updatedEspecie;

    beforeEach(function(done) {
      request(app)
        .put(`/api/especies/${newEspecie._id}`)
        .send({
          name: 'Updated Especie',
          info: 'This is the updated especie!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEspecie = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEspecie = {};
    });

    it('should respond with the original especie', function() {
      expect(updatedEspecie.name).to.equal('New Especie');
      expect(updatedEspecie.info).to.equal('This is the brand new especie!!!');
    });

    it('should respond with the updated especie on a subsequent GET', function(done) {
      request(app)
        .get(`/api/especies/${newEspecie._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let especie = res.body;

          expect(especie.name).to.equal('Updated Especie');
          expect(especie.info).to.equal('This is the updated especie!!!');

          done();
        });
    });
  });

  describe('PATCH /api/especies/:id', function() {
    var patchedEspecie;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/especies/${newEspecie._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Especie' },
          { op: 'replace', path: '/info', value: 'This is the patched especie!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEspecie = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEspecie = {};
    });

    it('should respond with the patched especie', function() {
      expect(patchedEspecie.name).to.equal('Patched Especie');
      expect(patchedEspecie.info).to.equal('This is the patched especie!!!');
    });
  });

  describe('DELETE /api/especies/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/especies/${newEspecie._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when especie does not exist', function(done) {
      request(app)
        .delete(`/api/especies/${newEspecie._id}`)
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
