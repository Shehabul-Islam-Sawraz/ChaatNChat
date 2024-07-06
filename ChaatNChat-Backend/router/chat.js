const router = require('express').Router()
const { index, create, messages } = require('../controllers/chatController')
const { validate } = require('../validators')
const { auth } = require('../middlewares/auth')

router.get('/', [auth], index)
router.post('/create', [auth], create)
router.get('/messages', [auth], messages)

module.exports = router