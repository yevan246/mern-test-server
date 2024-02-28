const jwt = require('jsonwebtoken')

class TokenService {
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1w'})
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET)
        } catch(e) {
            return false
        }
    }
}


module.exports = new TokenService()

