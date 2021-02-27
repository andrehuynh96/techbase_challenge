const config = require("app/config");

(async () => {
  try {
    if (config.enableSeed) {
      await require('./role')();
      await require('./department')();
      await require('./team')();
      await require('./employee')();
      await require('./employee-team')();
    }
    console.log('Seeding data done.');
  }
  catch (error) {
    console.log(error);
  }
})();
