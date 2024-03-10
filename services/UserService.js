const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const TokenService = require('./TokenService')
const UserExistsException = require('../exceptions/UserExistsException')
const UserNotFoundException = require('../exceptions/UserNotFoundException')
const UserPasswordIncorrectException = require('../exceptions/UserPasswordIncorrectException')

class UserService {
    async signup(email, username, password) {
        const isExists = await User.exists({
            $or: [{email}, {username}]
        })
    
        if(isExists) {
            throw new UserExistsException('User with this data already exists')
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = await User.create({email, username, password: hashedPassword})

        const token = TokenService.generateToken({userId: user._id})

        return {
            user, token
        }        
    }

    async login(emailOrUsername, password) {
        const candidate = await User.findOne({
            $or: [{email: emailOrUsername}, {username: emailOrUsername}]
        })

        if(!candidate) {
            throw new UserNotFoundException('User not found')
        }

        const isPasswordValid = await bcrypt.compare(password, candidate.password)

        if(!isPasswordValid) {
            throw new UserPasswordIncorrectException('Password is invalid')
        }

        const token = TokenService.generateToken({userId: candidate._id})

        return {
            user: candidate, token
        }
    }

    async getUsers(page, limit) {
        const users = await User.find({}).skip((page - 1) * limit).limit(limit).sort({_id: -1}).lean()
        return users
    }

    async getUserById(id) {
        const user = await User.findById(id).lean()
        return user
    }
}

module.exports = new UserService()