const Todo = require('../models/toDoModels')

const getToDos = async (req, res) => {
    const todos = await Todo.find({user: req.user._id}).lean()
    res.json(todos)
}

const addToDo = async (req, res) => {
    const {text} = req.body
    const todo = await Todo.create({text})
    res.json(todo)
}

const deleteToDo = async (req, res) => {
    const {id} = req.params
    await Todo.findByIdAndDelete(id)
    res.json({message: 'ToDo Deleted'})
}

const updateTodo = async (req, res) => {
    const {id} = req.params
    const dataToUpdate = req.body;
    await Todo.findByIdAndUpdate(id, dataToUpdate)
    res.json({message: 'ToDo updated'})
}


module.exports = { getToDos, addToDo, deleteToDo, updateTodo }