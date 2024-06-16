const router = require('express').Router()
const { update } = require('../controllers/userController')
const { validate } = require('../validators')
const { auth } = require('../middlewares/auth')

router.post('/update', [auth], update)

module.exports = router