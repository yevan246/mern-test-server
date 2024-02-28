const router = require("express").Router()
const { signUp, login, getMe } = require("../controllers/userController")
const tryCatchMiddleware = require('../middlewares/tryCatchMiddleware')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware')

router.post('/signup', tryCatchMiddleware(signUp))
router.post('/login', tryCatchMiddleware(login))

router.get('/getMe', checkAuthMiddleware, tryCatchMiddleware(getMe))


module.exports = router
