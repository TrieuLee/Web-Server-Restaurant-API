const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Restaurant", {
    Res_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    Res_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Res_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Res_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Res_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Res_time_open: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Res_time_closed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Res_email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Res_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
