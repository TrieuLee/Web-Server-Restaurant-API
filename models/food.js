const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Food", {
    Fd_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    Fd_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fd_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Fd_measureUnit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fd_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fd_foodStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Fd_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
