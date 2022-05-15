const { sequelize } = require("../models");

module.exports = async () => {
  try {
    await sequelize.sync();
    console.log("Connect database successfully !");
  } catch (error) {
    console.error("Connect database failed !");

    process.exit(0);
  }
};
