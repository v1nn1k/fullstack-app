const express = require('express')
const User = require('../models/user.model')

const router = express.Router();

router.get('/api/users', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

router.post('/api/users', async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    age: req.body.age,
  })

  console.log('Creating user', user)

  res.status(201).send(user)
})

router.delete('/api/users/:name', async (req, res) => {
  await User.deleteOne({ name: req.params.name });
  console.log('Deleting user', req.params.name)

  res.status(200).send("" + req.params.name)
})

module.exports = router;