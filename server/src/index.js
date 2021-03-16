const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/default.json')
const todoRouter = require('./routes/todos.route');
const usersRouter = require('./routes/users.route');
const createLogger = require('./utils/logger')
const cors = require('cors');

const logger = createLogger('express')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(todoRouter);
app.use(usersRouter);


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const main = async (config) => {
  const { PORT, DB_URL } = config;

  logger.log('Init app with config: ', config)

  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    logger.log('Connected to DB')

    app.listen(PORT, () => {
     logger.log(`Listening on port ${PORT}... `);
    })

  } catch (error) {
    console.error(error)
  }
}

main(config);
