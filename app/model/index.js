const database = require('app/lib/database');
const logger = require('app/lib/logger');

module.exports = {
  init: () => {
    require("./techbase");
    database.db().techbase.sync({ force: false }).then(() => {
      logger.info('Resync techbase data model and do not drop any data');
      // require('app/model/techbase/seed');
    });
  }
}
