'use strict';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import {User, Rol, Permiso} from '../sqldb';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
     // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
      if (req.query && typeof req.headers.authorization === 'undefined') {
        req.headers.authorization = `Bearer ${req.cookies.token}`;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.find({
        where: {
          id: req.user.id
        },
        include: [
          {
            model: Rol, as: 'rol',
            include: [
              Permiso
            ]
          }
        ]
      })
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (req.user.rol.id === roleRequired) {
        return next();
      } else {
        return res.status(403).send('Forbidden');
      }
    });
}

export function hasPermission(permissionRequired) {
  if (!permissionRequired) {
    throw new Error('Required role needs to be set');
  }
  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      const permissions = req.user.rol.permisos.map(p => p.id);
      if (permissions.includes(permissionRequired)) {
        return next()
      }
      return res.status(403).send('Forbidden');
    });
}
/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ id, role }, config.secrets.session, {
    expiresIn: '5d'
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user.id, req.user.rol.id);
  res.cookie('token', token);
  res.redirect('/');
}
