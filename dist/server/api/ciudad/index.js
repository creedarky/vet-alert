'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ciudad = require('./ciudad.controller');

var controller = _interopRequireWildcard(_ciudad);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasPermission(_environment2.default.PERMISOS.MONITOR), controller.create);
router.put('/:id', auth.hasPermission(_environment2.default.PERMISOS.MONITOR), controller.upsert);
router.patch('/:id', auth.hasPermission(_environment2.default.PERMISOS.MONITOR), controller.patch);
router.delete('/:id', auth.hasPermission(_environment2.default.PERMISOS.MONITOR), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
