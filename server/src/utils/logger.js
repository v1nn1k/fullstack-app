const createLogger = (prefix) => ({
  log: (...args) => {
    const date = new Date();

    const dateFormatted = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    console.log(`${dateFormatted} ${prefix}: `, ...args)
  }
})

module.exports = createLogger;