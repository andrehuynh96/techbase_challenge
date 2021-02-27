require('dotenv').config();

const pkg = require('../../package.json');
const logFolder = process.env.LOG_FOLDER || './public/logs';

const config = {
  logger: {
    level: process.env.LOG_LEVEL || "debug",
    console: {
      enable: true,
      level: process.env.LOG_LEVEL || "debug",
    },
    defaultLevel: 'debug',
    file: {
      compress: false,
      app: `${logFolder}/app.log`,
      error: `${logFolder}/error.log`,
      access: `${logFolder}/access.log`,
      format: '.yyyy-MM-dd',
    },
    appenders: ['CONSOLE', 'FILE', 'ERROR_ONLY'],
  },
  db: {
    techbase: {
      database: process.env.TECHBASE_DB_NAME,
      username: process.env.TECHBASE_DB_USER,
      password: process.env.TECHBASE_DB_PASS,
      options: {
        host: process.env.TECHBASE_DB_HOST,
        port: process.env.TECHBASE_DB_PORT,
        dialect: 'postgres',
        logging: process.env.POSTPRES_DEBUG === 'true' ? console.log : false,
      }
    }
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    prefix: process.env.REDIS_PREFIX || 'techbase-backend',
    usingPass: process.env.REDIS_USING_PASS || 0,
    pass: process.env.REDIS_PASS,
  },
  corsDomain: process.env.CORS_DOMAINS,
  rateLimit: process.env.RATE_LIMIT ? parseInt(process.env.RATE_LIMIT) : 100,
  sessionSecretKey: process.env.SESSION_SECRET_KEY || 'TECHBASE-6672b85fc8d14d26a221253b23f91234',
  sessionExpiredTimeInSeconds: parseInt(process.env.SESSION_EXPIRED_TIME_IN_SECONDS || 7200000),
  app: {
    name: process.env.APP_NAME || 'techbase-web-backend',
    version: pkg.version,
    description: pkg.description,
    buildNumber: process.env.BUILD_NUMBER || process.env.CI_JOB_ID || '',
    port: parseInt(process.env.PORT || process.env.APP_PORT),
  },
  enableSeed: process.env.ENABLE_SEED == 1 || 0
};

module.exports = config;
