
const database = require('app/lib/database').db().techbase;
const fs = require('fs');
const path = require('path');
const logger = require('app/lib/logger');

const basename = path.basename(__filename);
const db = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
      const model = database.import(path.join(__dirname,file));
      db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = database;
module.exports = db;
