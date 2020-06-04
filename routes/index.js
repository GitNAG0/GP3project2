const router = require('express').Router();

router.use('/api', require('./userRoutes.js'));
router.use('/api', require('./companyRoutes.js'));
router.use('api', require('./roundRoute.js'));
router.use('api', require('./peopleRoute.js'));
router.use(require('./viewRoutes.js'));

module.exports = router;
