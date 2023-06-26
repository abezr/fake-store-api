const express = require('express')
const router = express.Router()
const home = require('../controller/home')

router.get('/api/',home.indexPage)
router.get('/api/docs',home.docsPage)

module.exports = router