const router = require('express').Router()

router.use('/api', require('./companyByUser.js'))
router.use('/api', require ('./singleCompany.js'))
router.use('/api', require('./userByCompName.js'))
router.use('api', require('./rounds.js'))
router.use('api', require('./lastRound.js'))
router.use(require('./viewRoutes.js'))

module.exports = router 