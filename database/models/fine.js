"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fines.belongsTo(models.Books, {
        as: "book",
        foreignKey: {
          name: "idBook",
        },
      });
      Fines.belongsTo(models.Users, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  Fines.init(
    {
      idOrder: DataTypes.INTEGER,
      idBook: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      totalDay: DataTypes.INTEGER,
      totalFine: DataTypes.INTEGER,
      status: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Fines",
      underscored: true,
      paranoid: true,
    }
  );
  return Fines;
};