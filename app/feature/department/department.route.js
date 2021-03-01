const express = require('express');
const authenticate = require('app/middleware/authenticate-jwt.middleware');
const controller = require('./department.controller');

const router = express.Router();
router.get(
  '/departments',
  authenticate,
  controller.search
);

router.get(
  '/departments/:id',
  authenticate,
  controller.getDetails
);

module.exports = router;
