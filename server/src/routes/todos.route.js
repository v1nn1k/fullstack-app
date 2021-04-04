const express = require('express')
const Todo = require('../models/todo.model')

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

router.patch('/api/todos/:id', async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  await Todo.findByIdAndUpdate(id, {
    ...req.body,
  })

  const todos = await Todo.find({});

  res.status(201).json(todos)
})

module.exports = router;