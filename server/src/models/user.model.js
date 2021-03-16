const { Schema, model } = require('mongoose');

const User = new Schema({
  name: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },
})

module.exports = model('User', User);