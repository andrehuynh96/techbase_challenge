const express = require('express');
const validator = require('app/middleware/validator.middleware');
const controller = require('./login.controller');
const requestSchema = require('./login.request-schema');

const router = express.Router();
router.post(
  '/login',
  validator(requestSchema),
  controller
);

module.exports = router;
