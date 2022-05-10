const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Customer", {
    Cus_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    Cus_email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Cus_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
    Cus_fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
