'use strict';

var app = require('../..');
import request from 'supertest';

var newApoderado;

describe('Apoderado API:', function() {
  describe('GET /api/apoderados', function() {
    var apoderados;

    beforeEach(function(done) {
      request(app)
        .get('/api/apoderados')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          apoderados = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(apoderados).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/apoderados', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/apoderados')
        .send({
          name: 'New Apoderado',
          info: 'This is the brand new apoderado!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newApoderado = res.body;
          done();
        });
    });

    it('should respond with the newly created apoderado', function() {
      expect(newApoderado.name).to.equal('New Apoderado');
      expect(newApoderado.info).to.equal('This is the brand new apoderado!!!');
    });
  });

  describe('GET /api/apoderados/:id', function() {
    var apoderado;

    beforeEach(function(done) {
      request(app)
        .get(`/api/apoderados/${newApoderado._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          apoderado = res.body;
          done();
        });
    });

    afterEach(function() {
      apoderado = {};
    });

    it('should respond with the requested apoderado', function() {
      expect(apoderado.name).to.equal('New Apoderado');
      expect(apoderado.info).to.equal('This is the brand new apoderado!!!');
    });
  });

  describe('PUT /api/apoderados/:id', function() {
    var updatedApoderado;

    beforeEach(function(done) {
      request(app)
        .put(`/api/apoderados/${newApoderado._id}`)
        .send({
          name: 'Updated Apoderado',
          info: 'This is the updated apoderado!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedApoderado = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedApoderado = {};
    });

    it('should respond with the original apoderado', function() {
      expect(updatedApoderado.name).to.equal('New Apoderado');
      expect(updatedApoderado.info).to.equal('This is the brand new apoderado!!!');
    });

    it('should respond with the updated apoderado on a subsequent GET', function(done) {
      request(app)
        .get(`/api/apoderados/${newApoderado._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          let apoderado = res.body;

          expect(apoderado.name).to.equal('Updated Apoderado');
          expect(apoderado.info).to.equal('This is the updated apoderado!!!');

          done();
        });
    });
  });

  describe('PATCH /api/apoderados/:id', function() {
    var patchedApoderado;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/apoderados/${newApoderado._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Apoderado' },
          { op: 'replace', path: '/info', value: 'This is the patched apoderado!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patchedApoderado = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedApoderado = {};
    });

    it('should respond with the patched apoderado', function() {
      expect(patchedApoderado.name).to.equal('Patched Apoderado');
      expect(patchedApoderado.info).to.equal('This is the patched apoderado!!!');
    });
  });

  describe('DELETE /api/apoderados/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/apoderados/${newApoderado._id}`)
        .expect(204)
        .end(err => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when apoderado does not exist', function(done) {
      request(app)
        .delete(`/api/apoderados/${newApoderado._id}`)
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
