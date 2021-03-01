const jwt = require("jsonwebtoken");
const config = require("app/config");
const Sequelize = require('sequelize');
const logger = require("app/lib/logger");
const uuidV4 = require('uuid/v4');
const exampleAdmin = {
  username: 'example',
  password: 'Abc@123456'
}

module.exports = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username !== exampleAdmin.username || password !== exampleAdmin.password) {
      return res.badRequest('Username or password invalid!');
    }
    let token = _generateToken(req.body);
    return res.ok(token);
  }
  catch (error) {
    logger.error("login fail: ", error);
    next(error);
  }
};

function _generateToken(admin) {
  var payload = {
    username: admin.username,
    password: admin.password,
  };
  let accessToken = jwt.sign(payload, config.token.key.private, config.token.signOption);
  let refreshToken = Buffer.from(uuidV4()).toString('base64');
  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: config.token.signOption.expiresIn - 10,
    token_type: 'Bearer'
  };
}
