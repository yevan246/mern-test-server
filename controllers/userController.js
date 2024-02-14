const UserService = require('../services/UserService')


const signUp = async (req,res) => {
    const {email, username, password} = req.body

    try {
        const result = await UserService.signup(email, username, password)
        res.json(result)
    } catch(e) {
        res.status(400).json({message: e.message})
    }
}

module.exports = {signUp}