'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reporteMonitoreo = reporteMonitoreo;

var _sqldb = require('../../sqldb');

function reporteMonitoreo(req, res) {
  return _sqldb.sequelize.query('CALL sp_Reporte_VerMonitoreoPaciente(\'2016-11-09 00:00:00\', \'2017-11-17 00:00:00\')').spread(function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    res.status(200).json(params);
  });
} /**
   * Created by mcastro on 11/16/16.
   */
//# sourceMappingURL=reporte.controller.js.map
