'use strict';

var express = require('express');
var controller = require('./reporte.controller');

var router = express.Router();

router.get('/monitoreo', controller.reporteMonitoreo);

module.exports = router;
//# sourceMappingURL=index.js.map
