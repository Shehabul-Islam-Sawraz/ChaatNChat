const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.auth = (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // First element is bearer and second element is token

    if (!token) {
        return res.status(401).json({ error: 'Authentication Token Missing!' })
    }

    jwt.verify(token, config.appKey, (err, user) => {
        if (err) {
            return res.status(401).json({ error: err })
        }

        req.user = user
        // console.log(user)
    })

    // console.log(token)
    next()
}