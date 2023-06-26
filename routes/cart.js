const express = require('express')
const router = express.Router()
const cart = require('../controller/cart')

router.get('/api/',cart.getAllCarts)
router.get('/api/:id',cart.getSingleCart)
router.get('/api/user/:userid',cart.getCartsbyUserid)

router.post('/api/',cart.addCart)
//router.post('/api/:id',cart.addtoCart)

router.put('/api/:id',cart.editCart)
router.patch('/:id',cart.editCart)
router.delete('/:id',cart.deleteCart)

module.exports = router
