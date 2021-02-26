const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const baseResponse = require('app/lib/base-response');
const config = require('app/config');
const rateLimit = require('express-rate-limit');
const path = require('path');
const redis = require('app/lib/redis').client();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

router.use(cookieParser());
router.use(session({
  key: 'sid',
  secret: config.sessionSecretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: config.sessionExpiredTimeInSeconds,
    path: '/',
    secure: false,
    httpOnly: true,
  },
  store: new redisStore({ client: redis }),
}));

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  // res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.use(
  bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
  })
);
router.use(
  bodyParser.json({
    limit: '5mb',
    extended: true,
  })
);

if (config.corsDomain) {
  var allowedOrigins = config.corsDomain.split(',');
  router.use(
    cors({
      credentials: true,
      origin: allowedOrigins,
    })
  );
} else {
  router.use(cors());
}

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: config.rateLimit,
});
router.use(limiter);

router.use(helmet());
router.use(
  express.json({
    limit: '1mb',
    strict: true,
  })
);

router.use(
  baseResponse({
    i18n: true,
  })
);

router.get('/', function (req, res) {
  let result = {
    message: 'Hello',
    app: config.app.name,
    version: config.app.version,
    buildNumber: config.app.buildNumber,
    description: config.app.description,
  };
  res.json(result);
});

router.get('/health', (req, res) => res.send('OK!'));
router.use('/web', require('app/feature'));

router.use(function (req, res) {
  res.notFound('Not Found');
});

router.use((err, req, res, next) => {
  console.log(err);
  res.serverInternalError(err.message);
});

module.exports = router;
