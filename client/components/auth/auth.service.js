import _ from 'lodash';
'use strict';

class _User {
  _id = '';
  name = '';
  email = '';
  role = '';
  $promise = undefined;
}

export function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
  'ngInject';

  const safeCb = Util.safeCb;
  let currentUser = new _User();
  const userRoles = appConfig.userRoles || [];
  /**
   * Check if userRole is >= role
   * @param {String} userRole - role of current user
   * @param {String} role - role to check against
   */
  const hasRole = function(userRole, role) {
    return userRoles.indexOf(userRole) >= userRoles.indexOf(role);
  };

  if ($cookies.get('token') && $location.path() !== '/logout') {
    currentUser = User.get();
  }

  const Auth = {
    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - function(error, user)
     * @return {Promise}
     */
    login({
      email,
      password
    }, callback) {
      return $http.post('/auth/local', {
        email,
        password
      })
        .then(res => {
          $cookies.put('token', res.data.token);
          currentUser = User.get();
          return currentUser.$promise;
        })
        .then(user => {
          safeCb(callback)(null, user);
          return user;
        })
        .catch(err => {
          Auth.logout();
          safeCb(callback)(err.data);
          return $q.reject(err.data);
        });
    },

    /**
     * Delete access token and user info
     */
    logout() {
      $cookies.remove('token');
      currentUser = new _User();
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - function(error, user)
     * @return {Promise}
     */
    createUser(user, callback) {
      return User.save(user, function(data) {
        $cookies.put('token', data.token);
        currentUser = User.get();
        return safeCb(callback)(null, user);
      }, function(err) {
        Auth.logout();
        return safeCb(callback)(err);
      })
        .$promise;
    },

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - function(error, user)
     * @return {Promise}
     */
    changePassword(oldPassword, newPassword, callback) {
      return User.changePassword({
        id: currentUser._id
      }, {
        oldPassword,
        newPassword
      }, function() {
        return safeCb(callback)(null);
      }, function(err) {
        return safeCb(callback)(err);
      })
        .$promise;
    },

    /**
     * Gets all available info on a user
     *
     * @param  {Function} [callback] - function(user)
     * @return {Promise}
     */
    getCurrentUser(callback) {
      const value = _.get(currentUser, '$promise') ? currentUser.$promise : currentUser;

      return $q.when(value)
        .then(user => {
          safeCb(callback)(user);
          return user;
        }, () => {
          safeCb(callback)({});
          return {};
        });
    },

    /**
     * Gets all available info on a user
     *
     * @return {Object}
     */
    getCurrentUserSync() {
      return currentUser;
    },

    /**
     * Check if a user is logged in
     *
     * @param  {Function} [callback] - function(is)
     * @return {Promise}
     */
    isLoggedIn(callback) {
      return new Promise(() => {
        safeCb(callback)(true);
        return true;
      });
      // return Auth.getCurrentUser(undefined)
      //   .then(user => {
      //     let is = _.get(user, 'rol');
      //
      //     safeCb(callback)(is);
      //     return is;
      //   });
    },

    /**
     * Check if a user is logged in
     *
     * @return {Bool}
     */
    isLoggedInSync() {
      return true
    },

    /**
     * Check if a user has a specified role or higher
     *
     * @param  {Number}     rolId     - the role to check against
     * @param  {Function} [callback] - function(has)
     * @return {Promise}
     */
    hasRole(rolId, callback) {
      return Auth.getCurrentUser()
        .then(user => {
          let has = user.rol.id === rolId;

          safeCb(callback)(has);
          return has;
        });
    },

    hasPermission(permission, callback) {
      return Auth.getCurrentUser()
        .then(user => {
          const permissions = user.rol.permisos.map(p => p.id);
          const has = permissions.includes(permission);
          safeCb(callback)(has);
          return has;
        });
    },

    /**
     * Check if a user has a specified role or higher
     *
     * @param  {Number} rolId - the role to check against
     * @return {boolean}
     */
    hasRoleSync(rolId) {
      return currentUser && currentUser.rol && currentUser.rol.id === rolId;
    },

    /**
     * Check if a user is an admin
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {boolean|Promise}
     */
    isAdmin() {
      return Auth.hasRole(appConfig.ROLES.SUPER_ADMIN);
    },

    /**
     * Check if a user is an admin
     *
     * @return {boolean}
     */
    isAdminSync() {
      return Auth.hasRoleSync(appConfig.ROLES.SUPER_ADMIN);
    },

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    getToken() {
      return $cookies.get('token');
    }
  };

  return Auth;
}
