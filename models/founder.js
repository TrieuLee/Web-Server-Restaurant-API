const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Founder", {
    Fdr_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    Fdr_email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Fdr_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
    Fdr_fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
