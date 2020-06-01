const router = require('express').Router()

router.use('/api', require('./companyRoutes.js'))

module.exports = router 