const express = require('express')

const router = express.Router()

router.use(require('./companies-routes'))
router.use(require('./people-routes'))
router.use(require('./rounds-routes'))
router.use(require('./users-routes'))

module.exports = router