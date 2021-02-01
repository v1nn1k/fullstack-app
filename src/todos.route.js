

const express = require('express')
const Todo = require('./todo.model')

const router = express.Router();

router.get('/api/todos', async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

router.post('/api/todos', async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    completed: false,
    createdAt: (new Date()).toISOString()
  })

  console.log('Creating todo', todo)

  res.status(201).send()
})

module.exports = router;