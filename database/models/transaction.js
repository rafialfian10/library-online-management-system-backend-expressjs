"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Books, {
        as: "book",
        foreignKey: {
          name: "idBook",
        },
      });
      Transactions.belongsTo(models.Users, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  Transactions.init(
    {
      idBook: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      transactionType: DataTypes.STRING,
      totalBook: DataTypes.INTEGER,
      loanDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      loanMaximum: DataTypes.DATE,
      isStatus: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Transactions",
      underscored: true,
      paranoid: true,
    }
  );
  return Transactions;
};