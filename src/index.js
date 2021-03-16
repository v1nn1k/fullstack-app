
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const config = require('./config.json')
const todoRouter = require('./todos.route');
const usersRouter = require('./users.route');
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(todoRouter);
app.use(usersRouter);


const main = async (config) => {
  console.log('Init app with config: ', config)
  try {
    await mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to DB')

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}... `);
    })

  } catch (error) {
    console.error(error)
  }
}

main(config);
