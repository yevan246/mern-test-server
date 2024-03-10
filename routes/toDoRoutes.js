const { getToDos, addToDo, deleteToDo, updateTodo } = require('../controllers/toDoControllers')
const tryCatchMiddleware = require('../middlewares/tryCatchMiddleware')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware')

const router = require('express').Router()


router.get('/', checkAuthMiddleware, tryCatchMiddleware(getToDos))
router.post('/', checkAuthMiddleware, addToDo)
router.delete('/:id', checkAuthMiddleware, deleteToDo)
router.put('/:id', checkAuthMiddleware, updateTodo)


module.exports = router