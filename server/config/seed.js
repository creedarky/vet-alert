/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
const Thing = sqldb.Thing;
const User = sqldb.User;
const Rol = sqldb.Rol;
const Permiso = sqldb.Permiso;
const RolPermiso = sqldb.RolPermiso;

Thing.sync()
  .then(() => Thing.destroy({ where: {} }))
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    }]);
  });

const permisoPromise = Permiso.sync()
  .then(() => Permiso.destroy({where: {}}))
  .then(() => {
    return Permiso.bulkCreate([{
      id: 1,
      descripcion: 'usuario'
    }, {
      id: 2,
      descripcion: 'jaula'
    }, {
      id: 3,
      descripcion: 'paciente'
    }])
  });

const rolPromise = Rol.sync()
  .then(() => Rol.destroy({where: {}}))
  .then(() => {
    return Rol.bulkCreate([{
      id: 1,
      descripcion: 'super_admin'
    }, {
      id: 2,
      descripcion: 'admin'
    }, {
      id: 3,
      descripcion: 'usuario'
    }])
  })

Promise.all([rolPromise, permisoPromise])
  .then(() => {
    RolPermiso.sync()
      .then(() => RolPermiso.destroy({where: {}}))
      .then(() => {

        RolPermiso.bulkCreate([{
          id_rol: 1,
          id_permiso: 1
        }, {
          id_rol: 1,
          id_permiso: 2
        }, {
          id_rol: 1,
          id_permiso: 3
        }, {
          id_rol: 2,
          id_permiso: 2
        }, {
          id_rol: 2,
          id_permiso: 3
        }, {
          id_rol: 3,
          id_permiso: 3
        }])
      });

    User.sync()
      .then(() => User.destroy({ where: {} }))
      .then(() => {
        User.bulkCreate([{
          provider: 'local',
          nombre: 'Test',
          apellido: 'User',
          email: 'test@example.com',
          password: 'test',
          id_rol: 3
        }, {
          provider: 'local',
          nombre: 'Super',
          apellido: 'Admin',
          email: 'admin@example.com',
          password: 'admin',
          id_rol: 1
        }, {
          provider: 'local',
          nombre: 'Normal',
          apellido: 'Admin',
          email: 'admin_normal@example.com',
          password: 'admin',
          id_rol: 2
        }])
          .then(() => {
            console.log('finished populating users');
          });
      });
  });
