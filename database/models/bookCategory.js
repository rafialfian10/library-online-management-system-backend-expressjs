"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookCategories.init(
    {
      idBook: DataTypes.INTEGER,
      idCategory: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BookCategories",
      paranoid: true,
      underscored: true,
    }
  );
  return BookCategories;
};
