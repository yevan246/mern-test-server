const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const TokenService = require('./TokenService')

class UserService {
    async signup(email, username, password) {
        const isExists = await User.exists({
            $or: [{email}, {username}]
        })
    
        if(isExists) {
            throw new Error('Exists')
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = await User.create({email, username, password: hashedPassword})

        const token = TokenService.generateToken(user._id)

        return {
            user, token
        }        
    }
}

module.exports = new UserService()