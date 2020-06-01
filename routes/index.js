const router = require('express').Router()

router.use('/api', require('./companiesUser.js'))
router.use('/api', require ('./oneCompany.js'))
router.use('/api', require('./oneCompanyPeople.js'))
router.use('api', require('./oneCompanyRound.js'))
router.use('api', require('./lastRound.js'))
router.use(require('./viewRoutes.js'))

module.exports = router 