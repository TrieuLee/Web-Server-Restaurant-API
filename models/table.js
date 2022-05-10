const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Table", {
    Tbl_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    Tbl_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tbl_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Tbl_deposit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Tbl_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
