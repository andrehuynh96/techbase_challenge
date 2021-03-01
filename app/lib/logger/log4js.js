const log4js = require('log4js');
const config = require('app/config')

const logLayout = {
  type: 'pattern',
  pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} %p %z %c %m'
};

const appenders = {
  FILE: {
    type: 'dateFile',
    filename: config.logger.file.app,
    pattern: config.logger.file.format,
    level: 'trace',
    layout: logLayout,
    compress: config.logger.file.compress,
    daysToKeep: 90
  },
  CONSOLE: {
    type: 'stdout',
    layout: logLayout,
    level: 'trace'
  },
  FILE_ERROR: {
    type: 'dateFile',
    filename: config.logger.file.error,
    pattern: config.logger.file.format,
    level: 'trace',
    layout: logLayout,
    compress: config.logger.file.compress,
    daysToKeep: 90
  },
  ERROR_ONLY: {
    type: 'logLevelFilter',
    appender: 'FILE_ERROR',
    level: 'error'
  }
};

log4js.configure({
  appenders,
  categories: {
    default: {
      appenders: config.logger.appenders,
      level: config.logger.defaultLevel
    }
  }
});

const logger = log4js.getLogger("cheese");

module.exports = logger;
