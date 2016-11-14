'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================

module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.ip || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

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
  }
};
//# sourceMappingURL=production.js.map
