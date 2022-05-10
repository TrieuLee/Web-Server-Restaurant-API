const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("TypeofFood", {
    ToF_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    ToF_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ToF_state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
};
