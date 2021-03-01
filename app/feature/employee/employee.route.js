const express = require('express');
const authenticate = require('app/middleware/authenticate-jwt.middleware');
const controller = require('./employee.controller');

const router = express.Router();
router.get(
  '/employees',
  authenticate,
  controller.search
);

router.get(
  '/employees/:id',
  authenticate,
  controller.getDetails
);

module.exports = router;
