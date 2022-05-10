const expressLoader = require("./express.loader");
const databaseLoader = require("./database.loader");

module.exports = async (app) => {
  await databaseLoader();
  expressLoader(app);
};
