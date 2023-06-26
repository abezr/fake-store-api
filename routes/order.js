const express = require('express')
const router = express.Router()
const order = require('../controller/order')

router.get('/api/',order.getAllOrder)
router.get('/api/:id',order.getOrder)
router.post('/api/',order.addOrder)
router.put('/api/:id',order.editOrder)
router.patch('/:id',order.editOrder)
router.delete('/:id',order.deleteOrder)

module.exports = router