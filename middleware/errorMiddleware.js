const winston = require('winston');
require('winston-mongodb');

// LOGGER
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'ReVue Service' },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/warnings.log',
      level: 'warn',
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
    // WINSTON MONGODB CONNECTION -- CHANGE MONGO_ADDRESS VARIABLE TO APPROPRIATE CONNECTION STRING
    new winston.transports.MongoDB({
      db: `${process.env.MONGO_ADDRESS}/revue`,
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

// ERRORS
errorMiddleware = (err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send('Something failed...');
};

// UNCAUGHT EXCEPTIONS
process.on('uncaughtException', (ex) => {
  console.log('An uncaught exception occurred...');
  logger.error(ex.message, ex);
});
// throw new Error('Something failed during startup.');

// UNHANDLED REJECTIONS
process.on('unhandledRejection', (rej) => {
  console.log('An unhandled rejection occurred...');
  logger.error(rej.message, rej);
});

// const p = Promise.reject(new Error('The promise was rejected!'));
// p.then(() => console.log('Done'));

module.exports = errorMiddleware;
