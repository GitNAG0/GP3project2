<<<<<<< HEAD
const router = require('express').Router();

router.use('/api', require('./users.js'));
router.use('/api', require('./companyRoutes.js'));
router.use('api', require('./roundRoute.js'));
router.use('api', require('./peopleRoute.js'));
router.use(require('./viewRoutes.js'));

module.exports = router;
=======
const express = require('express')

const router = express.Router()

router.use(require('./documentWriter'))

module.exports = router
>>>>>>> ddf40d0d2e3e09089ea95dccfd11e2d2bc16e278
