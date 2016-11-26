'use strict';

import express from 'express';
import * as controller from './paciente.controller';
import * as auth from '../../auth/auth.service';
import config from '../../config/environment';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasPermission(config.PERMISOS.MONITOR), controller.create);
router.put('/:id', auth.hasPermission(config.PERMISOS.MONITOR), controller.upsert);
router.patch('/:id', auth.hasPermission(config.PERMISOS.MONITOR), controller.patch);
router.delete('/:id', auth.hasPermission(config.PERMISOS.MONITOR), controller.destroy);

module.exports = router;

