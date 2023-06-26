const express = require('express')
const router = express.Router()
const order = require('../controller/order')

router.get('/',order.getAllOrder)
router.get('/:id',order.getOrder)
router.post('/',order.addOrder)
router.put('/:id',order.editOrder)
router.patch('/:id',order.editOrder)
router.delete('/:id',order.deleteOrder)

module.exports = router