const router = require('express').Router()
const { index } = require('../controllers/chatController')
const { validate } = require('../validators')
const { auth } = require('../middlewares/auth')

router.get('/', [auth], index)

module.exports = router