const { getToDos, addToDo, deleteToDo, updateTodo } = require('../controllers/toDoControllers')

const router = require('express').Router()


router.get('/', getToDos)
router.post('/', addToDo)
router.delete('/:id', deleteToDo)
router.put('/:id', updateTodo)


module.exports = router