const jwt = require('jsonwebtoken')

class TokenService {
    generateToken(payload) {
        return jwt.sign(payload, 'SECRET', {expiresIn: '1w'})
    }
}


module.exports = new TokenService()

