const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    delete user.password

    const token = jwt.sign(user, 'secret_key', { expiresIn: 600 }) // Expires in 10 minutes

    return { ...user, ...{ token } }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Incorrect Password!' })
        }

        const userWithToken = generateToken(user.get({ raw: true }))

        return res.send(userWithToken)
    }
    catch (e) {
        return res.status(500).json({ message: e.message })
    }

    return res.send([email, password])
}

exports.register = async (req, res) => {

}