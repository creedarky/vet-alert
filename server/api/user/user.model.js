'use strict';

import crypto from 'crypto';

var validatePresenceOf = function(value) {
  return value && value.length;
};

export default function(sequelize, DataTypes) {
  var User = sequelize.define('usuario', {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'The specified email address is already in use.'
      },
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    provider: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    underscored: true,
    underscoredAll: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    freezeTableName: true,

    /**
     * Virtual Getters
     */
    getterMethods: {
      // Public profile information
      profile() {
        return {
          name: this.name,
          role: this.role
        };
      },

      // Non-sensitive info we'll be putting in the token
      token() {
        return {
          id: this.id,
          role: this.role
        };
      }
    },

    /**
     * Pre-save hooks
     */
    hooks: {
      beforeBulkCreate(users, fields, fn) {
        console.log('beforeBulCreated');
        var totalUpdated = 0;
        users.forEach(user => {
          user.updatePassword(err => {
            if (err) {
              return fn(err);
            }
            totalUpdated += 1;
            if (totalUpdated === users.length) {
              return fn();
            }
          });
        });
      },
      beforeCreate(user, fields, fn) {
        user.updatePassword(fn);
      },
      beforeUpsert(user, fields, fn) {
        console.log('beforeUpsert', user);
        return user.updatePassword(fn);
      },
      beforeUpdate(user, fields, fn) {
        if (user.changed('password')) {
          return user.updatePassword(fn);
        }
        fn();
      },

    },

    /**
     * Instance Methods
     */
    instanceMethods: {
      /**
       * Authenticate - check if the passwords are the same
       *
       * @param {String} password
       * @param {Function} callback
       * @return {Boolean}
       * @api public
       */
      authenticate(password, callback) {
        if (!callback) {
          return this.password === this.encryptPassword(password);
        }

        this.encryptPassword(password, (err, pwdGen) => {
          if (err) {
            return callback(err);
          }

          if (this.password === pwdGen) {
            return callback(null, true);
          }
          return callback(null, false);
        });
      },

      /**
       * Make salt
       *
       * @param {Number} [byteSize] - Optional salt byte size, default to 16
       * @param {Function} callback
       * @return {String}
       * @api public
       */
      makeSalt(byteSize, callback) {
        var defaultByteSize = 16;

        if (typeof arguments[0] === 'function') {
          callback = arguments[0];
          byteSize = defaultByteSize;
        } else if (typeof arguments[1] === 'function') {
          callback = arguments[1];
        } else {
          throw new Error('Missing Callback');
        }

        if (!byteSize) {
          byteSize = defaultByteSize;
        }

        return crypto.randomBytes(byteSize, function(err, salt) {
          if (err) {
            return callback(err);
          }
          return callback(null, salt.toString('base64'));
        });
      },

      /**
       * Encrypt password
       *
       * @param {String} password
       * @param {Function} callback
       * @return {String}
       * @api public
       */
      encryptPassword(password, callback) {
        if (!password || !this.salt) {
          return callback ? callback(null) : null;
        }

        const defaultIterations = 10000;
        const defaultKeyLength = 64;
        const salt = new Buffer(this.salt, 'base64');

        if (!callback) {
          return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                       .toString('base64');
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength,
          function(err, key) {
            if (err) {
              return callback(err);
            }
            return callback(null, key.toString('base64'));
          });
      },

      /**
       * Update password field
       *
       * @param {Function} fn
       * @return {String}
       * @api public
       */
      updatePassword(fn) {
        // Handle new/update passwords
        if (!this.password) return fn(null);

        if (!validatePresenceOf(this.password)) {
          fn(new Error('Invalid password'));
        }

        // Make salt with a callback
        this.makeSalt((saltErr, salt) => {
          if (saltErr) {
            return fn(saltErr);
          }
          this.salt = salt;
          this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
            if (encryptErr) {
              fn(encryptErr);
            }
            console.log(this.salt, this.password, hashedPassword);;
            this.password = hashedPassword;
            fn(null);
          });
        });
      }
    }
  });

  return User;
}
