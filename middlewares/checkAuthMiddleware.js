const TokenService = require('../services/TokenService')
const User = require('../models/userModel')


const checkAuthMiddleware = async (req, res, next) => {
    const {authorization} = req.headers


    if(!authorization) {
        return res.status(401).json({message: 'Not authorized'})
    }
    const token = authorization.split(' ')[1]

    const verified = TokenService.verifyToken(token)
    if(!verified) {
        return res.status(401).json({message: 'Token invalid'})
    }

    const user = await User.findById(verified.userId).lean()
    if(!user) {
        return res.status(401).json({message: 'User not exists'})
    }

    req.user = user

    next()
}

module.exports = checkAuthMiddleware
