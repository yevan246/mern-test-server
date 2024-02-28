const UserService = require('../services/UserService')

const signUp = async (req, res) => {
    const {email, username, password} = req.body

    const result = await UserService.signup(email, username, password)
    res.json(result)
}

const login = async (req, res) => {
    const {emailOrUsername, password} = req.body

    const result = await UserService.login(emailOrUsername, password)
    res.json(result)
}

const getMe = (req, res) => {
    res.json({user: req.user})
}

module.exports = {signUp, login, getMe}
