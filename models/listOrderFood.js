const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("ListOrderFood", {
    Orf_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    Ord_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Ord_totalMoney: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Ord_datetime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ord_Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ord_customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
