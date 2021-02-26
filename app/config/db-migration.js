require('dotenv').config();
module.exports = {
  username: process.env.TECHBASE_DB_USER,
  password: process.env.TECHBASE_DB_PASS,
  database: process.env.TECHBASE_DB_NAME,
  host: process.env.TECHBASE_DB_HOST,
  port: process.env.TECHBASE_DB_PORT,
  dialect: "postgres",
  operatorsAliases: 0,
  define: {
    underscored: true,
    underscoredAll: true
  }
}
