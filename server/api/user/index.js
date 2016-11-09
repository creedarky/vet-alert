'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';
import config from '../../config/environment';

var router = new Router();

router.get('/', auth.hasPermission(config.PERMISOS.USUARIOS), controller.index);
router.delete('/:id', auth.hasPermission(config.PERMISOS.USUARIOS), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
