const express = require("express");
const router = express.Router();

router.use(require('./login/login.route'));
router.use(require('./employee/employee.route'));

module.exports = router;
