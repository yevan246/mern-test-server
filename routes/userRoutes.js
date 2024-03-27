const router = require("express").Router()
const { signUp, login, getMe, getUsers, getUserById, getPostsByUserId } = require("../controllers/userController")
const tryCatchMiddleware = require('../middlewares/tryCatchMiddleware')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware')

router.post('/signup', tryCatchMiddleware(signUp))
router.post('/login', tryCatchMiddleware(login))

router.get('/getMe', checkAuthMiddleware, tryCatchMiddleware(getMe))


router.get('/', checkAuthMiddleware, tryCatchMiddleware(getUsers))
router.get('/:id', checkAuthMiddleware, tryCatchMiddleware(getUserById))

router.get('/:userId/posts', checkAuthMiddleware, tryCatchMiddleware(getPostsByUserId))


module.exports = router
