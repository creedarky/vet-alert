'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================

module.exports = {

  // Sequelize connection opions
  sequelize: {
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'mypass',
    database: 'vet-alert',
    options: {
      logging: false,
      storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
//# sourceMappingURL=development.js.map
