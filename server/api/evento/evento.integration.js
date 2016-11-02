'use strict';

var app = require('../..');
import request from 'supertest';

var newEvento;

describe('Evento API:', function() {
  describe('GET /api/eventos', function() {
    var eventos;

    beforeEach(function(done) {
      request(app)
        .get('/api/eventos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          eventos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(eventos).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/eventos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/eventos')
        .send({
          name: 'New Evento',
          info: 'This is the brand new evento!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEvento = res.body;
          done();
        });
    });

    it('should respond with the newly created evento', function() {
      expect(newEvento.name).to.equal('New Evento');
      expect(newEvento.info).to.equal('This is the brand new evento!!!');
    });
  });

  describe('GET /api/eventos/:id', function() {
    var evento;

    beforeEach(function(done) {
      request(app)
        .get(`/api/eventos/${newEvento._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          evento = res.body;
          done();
        });
    });

    afterEach(function() {
      evento = {};
    });

    it('should respond with the requested evento', function() {
      expect(evento.name).to.equal('New Evento');
      expect(evento.info).to.equal('This is the brand new evento!!!');
    });
  });

  describe('PUT /api/eventos/:id', function() {
    var updatedEvento;

    beforeEach(function(done) {
      request(app)
        .put(`/api/eventos/${newEvento._id}`)
        .send({
          name: 'Updated Evento',
          info: 'This is the updated evento!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEvento = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEvento = {};
    });

    it('should respond with the original evento', function() {
      expect(updatedEvento.name).to.equal('New Evento');
      expect(updatedEvento.info).to.equal('This is the brand new evento!!!');
    });

    it('should respond with the updated evento on a subsequent GET', function(done) {
      request(app)
        .get(`/api/eventos/${newEvento._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let evento = res.body;

          expect(evento.name).to.equal('Updated Evento');
          expect(evento.info).to.equal('This is the updated evento!!!');

          done();
        });
    });
  });

  describe('PATCH /api/eventos/:id', function() {
    var patchedEvento;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/eventos/${newEvento._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Evento' },
          { op: 'replace', path: '/info', value: 'This is the patched evento!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEvento = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEvento = {};
    });

    it('should respond with the patched evento', function() {
      expect(patchedEvento.name).to.equal('Patched Evento');
      expect(patchedEvento.info).to.equal('This is the patched evento!!!');
    });
  });

  describe('DELETE /api/eventos/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/eventos/${newEvento._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when evento does not exist', function(done) {
      request(app)
        .delete(`/api/eventos/${newEvento._id}`)
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
