'use strict';

var app = require('../..');
import request from 'supertest';

var newComuna;

describe('Comuna API:', function() {
  describe('GET /api/comunas', function() {
    var comunas;

    beforeEach(function(done) {
      request(app)
        .get('/api/comunas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          comunas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(comunas).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/comunas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/comunas')
        .send({
          name: 'New Comuna',
          info: 'This is the brand new comuna!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newComuna = res.body;
          done();
        });
    });

    it('should respond with the newly created comuna', function() {
      expect(newComuna.name).to.equal('New Comuna');
      expect(newComuna.info).to.equal('This is the brand new comuna!!!');
    });
  });

  describe('GET /api/comunas/:id', function() {
    var comuna;

    beforeEach(function(done) {
      request(app)
        .get(`/api/comunas/${newComuna._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          comuna = res.body;
          done();
        });
    });

    afterEach(function() {
      comuna = {};
    });

    it('should respond with the requested comuna', function() {
      expect(comuna.name).to.equal('New Comuna');
      expect(comuna.info).to.equal('This is the brand new comuna!!!');
    });
  });

  describe('PUT /api/comunas/:id', function() {
    var updatedComuna;

    beforeEach(function(done) {
      request(app)
        .put(`/api/comunas/${newComuna._id}`)
        .send({
          name: 'Updated Comuna',
          info: 'This is the updated comuna!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedComuna = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedComuna = {};
    });

    it('should respond with the original comuna', function() {
      expect(updatedComuna.name).to.equal('New Comuna');
      expect(updatedComuna.info).to.equal('This is the brand new comuna!!!');
    });

    it('should respond with the updated comuna on a subsequent GET', function(done) {
      request(app)
        .get(`/api/comunas/${newComuna._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let comuna = res.body;

          expect(comuna.name).to.equal('Updated Comuna');
          expect(comuna.info).to.equal('This is the updated comuna!!!');

          done();
        });
    });
  });

  describe('PATCH /api/comunas/:id', function() {
    var patchedComuna;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/comunas/${newComuna._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Comuna' },
          { op: 'replace', path: '/info', value: 'This is the patched comuna!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedComuna = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedComuna = {};
    });

    it('should respond with the patched comuna', function() {
      expect(patchedComuna.name).to.equal('Patched Comuna');
      expect(patchedComuna.info).to.equal('This is the patched comuna!!!');
    });
  });

  describe('DELETE /api/comunas/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/comunas/${newComuna._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when comuna does not exist', function(done) {
      request(app)
        .delete(`/api/comunas/${newComuna._id}`)
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
