const express = require('express')
const router = express.Router()
const user = require('../controller/user')

router.get('/api/',user.getAllUser)
router.get('/api/:id',user.getUser)
router.post('/api/',user.addUser)
router.put('/api/:id',user.editUser)
router.patch('/:id',user.editUser)
router.delete('/:id',user.deleteUser)

module.exports = router