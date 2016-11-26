import jsonpatch from 'fast-json-patch';

export default {
  respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity = {}) {
      if (entity) {
        return res.status(statusCode).json(entity);
      }
      return res.status(statusCode).json({});
    };
  },

  patchUpdates(patches) {
    return function(entity) {
      try {
        jsonpatch.apply(entity, patches, /*validate*/ true);
      } catch(err) {
        return Promise.reject(err);
      }

      return entity.save();
    };
  },

  removeEntity(res) {
    return function(entity) {
      if (entity) {
        return entity.destroy()
          .then(() => {
            res.status(204).end();
          });
      }
    };
  },

  handleEntityNotFound(res) {
    return function(entity) {
      if (!entity) {
        res.status(404).end();
        return null;
      }
      return entity;
    };
  },
  handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
      res.status(statusCode).send(err);
    };
  }
}
