const router = require('express').Router()
const { update, search } = require('../controllers/userController')
const { validate } = require('../validators')
const { auth } = require('../middlewares/auth')
const { rules: updateRules } = require('../validators/user/update')
const { userFile } = require('../middlewares/fileUpload')

router.post('/update', [auth, userFile, updateRules, validate], update)
router.get('/search-users', auth, search)

module.exports = router