const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Payment", {
    Pm_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    Pm_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Pm_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Pm_totalMoney: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Pm_dateTimePayment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
