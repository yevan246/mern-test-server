const { getToDos, addToDo, deleteToDo, updateTodo } = require('../controllers/toDoControllers')
const tryCatchMiddleware = require('../middlewares/tryCatchMiddleware')

const router = require('express').Router()


router.get('/', tryCatchMiddleware(getToDos))
router.post('/', addToDo)
router.delete('/:id', deleteToDo)
router.put('/:id', updateTodo)


module.exports = router