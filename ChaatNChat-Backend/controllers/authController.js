const User = require('../models').User
const bcrypt = require('bcrypt')

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

        return res.send(user)
    }
    catch (e) {

    }

    return res.send([email, password])
}

exports.register = async (req, res) => {

}