const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'vidly-service' },
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
    new winston.transports.MongoDB({
      db: `${process.env.MONGO_ADDRESS}/vidly`,
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

errorMiddleware = (err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send('Something Failed');
};
module.exports = errorMiddleware;
