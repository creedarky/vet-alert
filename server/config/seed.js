/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
/* eslint-disable */

'use strict';
// import sqldb from '../sqldb';
// const { Especie, Apoderado, Paciente, User } = sqldb;
//
// const permisoPromise = Permiso.sync()
//   .then(() => Permiso.destroy({where: {}}))
//   .then(() => {
//     return Permiso.bulkCreate([{
//       id: 1,
//       descripcion: 'usuario'
//     }, {
//       id: 2,
//       descripcion: 'monitor'
//     }, {
//       id: 3,
//       descripcion: 'paciente'
//     }])
//   });
//
// const rolPromise = Rol.sync()
//   .then(() => Rol.destroy({where: {}}))
//   .then(() => {
//     return Rol.bulkCreate([{
//       id: 1,
//       descripcion: 'super_admin'
//     }, {
//       id: 2,
//       descripcion: 'admin'
//     }, {
//       id: 3,
//       descripcion: 'usuario'
//     }])
//   })
//
// Promise.all([rolPromise, permisoPromise])
//   .then(() => {
//     RolPermiso.sync()
//       .then(() => RolPermiso.destroy({where: {}}))
//       .then(() => {
//
//         RolPermiso.bulkCreate([{
//           id_rol: 1,
//           id_permiso: 1
//         }, {
//           id_rol: 1,
//           id_permiso: 2
//         }, {
//           id_rol: 1,
//           id_permiso: 3
//         }, {
//           id_rol: 2,
//           id_permiso: 2
//         }, {
//           id_rol: 2,
//           id_permiso: 3
//         }, {
//           id_rol: 3,
//           id_permiso: 3
//         }])
//       });
//
//     User.sync()
//       .then(() => User.destroy({ where: {} }))
//       .then(() => {
//         User.bulkCreate([{
//           provider: 'local',
//           nombre: 'Test',
//           apellido: 'User',
//           email: 'test@example.com',
//           password: 'test',
//           id_rol: 3
//         }, {
//           provider: 'local',
//           nombre: 'Super',
//           apellido: 'Admin',
//           email: 'admin@example.com',
//           password: 'admin',
//           id_rol: 1
//         }, {
//           provider: 'local',
//           nombre: 'Normal',
//           apellido: 'Admin',
//           email: 'admin_normal@example.com',
//           password: 'admin',
//           id_rol: 2
//         }])
//           .then(() => {
//             console.log('finished populating users');
//           });
//       });
//   });

// Especie.sync()
//   .then(() => {
//     const especies = [
//       {
//         id: 1,
//         nombre: 'can',
//         sexo: 'femenino',
//         minPpm: 70,
//         maxPpm: 120,
//         minTemp: 35,
//         maxTemp: 39.5
//       }, {
//         id: 2,
//         nombre: 'can',
//         sexo: 'masculino',
//         minPpm: 70,
//         maxPpm: 120,
//         minTemp: 35,
//         maxTemp: 39.5
//       }, {
//         id: 3,
//         nombre: 'felino',
//         sexo: 'femenino',
//         minPpm: 70,
//         maxPpm: 120,
//         minTemp: 35,
//         maxTemp: 39.5
//       }, {
//         id: 4,
//         nombre: 'felino',
//         sexo: 'masculino',
//         minPpm: 70,
//         maxPpm: 120,
//         minTemp: 35,
//         maxTemp: 39.5
//       }
//     ];
//     const promises = especies.map((e) => Especie.upsert(e));
//     return Promise.all(promises)
//   })
//   .then(() => {
//     Apoderado.sync()
//       .then(() => {
//         return Apoderado.upsert({
//           id: 1,
//           nombre: 'Apoderado',
//           apellido: 'Apoderado',
//           direccion: 'direccion #12345',
//         })
//       })
//       .then(() => {
//         return Paciente.upsert({
//           id: 1,
//           nombre: 'Perro Prueba',
//           id_especie: 2,
//           id_apoderado: 1,
//           id_monitor: 1,
//           annoNacimiento: 2010,
//           carnet: 123456,
//           sexo: 'masculino',
//           direccion: 'direccion #12345'
//         })
//       });
//   });

// User.sync()
//   .then(() => User.destroy({ where: {} }))
//   .then(() => {
//     const users = [{
//       provider: 'local',
//       nombre: 'Test',
//       apellido: 'User',
//       email: 'test@example.com',
//       password: 'test',
//       id_rol: 3
//     }, {
//       provider: 'local',
//       nombre: 'Super',
//       apellido: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin',
//       id_rol: 1
//     }, {
//       provider: 'local',
//       nombre: 'Normal',
//       apellido: 'Admin',
//       email: 'admin_normal@example.com',
//       password: 'admin',
//       id_rol: 2
//     }];
//     User.bulkCreate(users);
//     // const promises = users.map((u) => User.upsert(u));
//     // return Promise.all(promises)
//   });


/*eslint-enable */
