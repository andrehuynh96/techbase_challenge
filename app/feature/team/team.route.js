const express = require('express');
const authenticate = require('app/middleware/authenticate-jwt.middleware');
const controller = require('./team.controller');

const router = express.Router();
router.get(
  '/teams',
  authenticate,
  controller.search
);

router.get(
  '/teams/:id',
  authenticate,
  controller.getEmployeeOfTeam
);

module.exports = router;
