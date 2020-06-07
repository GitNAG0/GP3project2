const router = require('express').Router();

router.use('/api', require('./users.js'));
router.use('/api', require('./companyRoutes.js'));
router.use('/api', require('./roundRoute.js'));
router.use('/api', require('./peopleRoute.js'));
//router.use(require('./viewRoutes.js')); Why?

module.exports = router;
